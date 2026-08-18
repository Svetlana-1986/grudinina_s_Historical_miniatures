import { Router } from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';

import { upload } from '../lib/upload.js';

import { imageProcessor } from '../services/image/index.js';
import { imageStorage } from '../services/storage/index.js';

const router = Router();

const uploadMiddleware = (
  req: Parameters<import('express').RequestHandler>[0],
  res: Parameters<import('express').RequestHandler>[1],
  next: Parameters<import('express').RequestHandler>[2],
) => {
  upload.single('image')(req, res, (error) => {
    /*
     * Если Multer не обнаружил ошибку,
     * передаём управление следующему middleware.
     */
    if (!error) {
      next();
      return;
    }

    /*
     * 1. Ошибки самого Multer.
     */
    if (error instanceof multer.MulterError) {
      /*
       * Файл слишком большой.
       *
       * Эта ошибка возникает благодаря:
       *
       * limits: {
       *   fileSize: MAX_IMAGE_SIZE,
       * }
       *
       * в lib/upload.ts.
       */
      if (error.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({
          error: 'Размер изображения не должен превышать 10 МБ.',
        });

        return;
      }

      /*
       * Остальные ошибки Multer.
       */
      res.status(400).json({
        error: 'Ошибка загрузки изображения.',
      });

      return;
    }

    /*
     * 2. Наша собственная ошибка,
     * которую создаёт fileFilter() в lib/upload.ts.
     *
     * Там у нас:
     *
     * cb(new Error('UNSUPPORTED_IMAGE_TYPE'));
     */
    if (error instanceof Error && error.message === 'UNSUPPORTED_IMAGE_TYPE') {
      res.status(400).json({
        error: 'Поддерживаются только изображения JPEG, PNG и WebP.',
      });

      return;
    }

    /*
     * 3. Если ошибка неизвестная,
     * не пытаемся обработать её здесь.
     *
     * Передаём её стандартному Express error handler.
     */
    next(error);
  });
};

router.post(
  '/upload/card-image',

  /*
   * Сначала принимаем файл через Multer.
   */
  uploadMiddleware,

  /*
   * Если Multer успешно принял файл,
   * выполнение приходит сюда.
   */
  async (req, res) => {
    /*
     * Здесь будут находиться пути файлов,
     * которые уже успели сохраниться в постоянное хранилище.
     *
     * Если следующий шаг упадёт,
     * мы удалим именно эти файлы.
     */
    const uploadedPaths: string[] = [];

    try {
      /*
       * На этом этапе Multer уже должен был
       * сохранить файл.
       *
       * Но дополнительная проверка нужна
       * для TypeScript и защиты от неожиданного состояния.
       */
      if (!req.file) {
        return res.status(400).json({
          error: 'Необходимо выбрать изображение.',
        });
      }

      /*
       * Временный путь, куда Multer сохранил файл.
       *
       * Например:
       *
       * uploads/cards/550e8400-e29b-41d4-a716-446655440000.jpg
       */
      const originalFilePath = req.file.path;

      /*
       * Имя файла без расширения.
       *
       * Например:
       *
       * 550e8400-e29b-41d4-a716-446655440000
       */
      const fileNameWithoutExt = path.parse(req.file.filename).name;

      /*
       * Полное имя оригинального файла.
       */
      const originalFileName = req.file.filename;

      /*
       * Пути внутри нашего локального storage.
       *
       * Важно:
       * это НЕ абсолютные пути Windows.
       *
       * Это логические пути относительно uploads/.
       */
      const originalPath = `cards/original/${originalFileName}`;

      const previewPath = `cards/preview/${fileNameWithoutExt}-preview.webp`;

      const heroPath = `cards/hero/${fileNameWithoutExt}-hero.webp`;

      /*
       * Читаем временный файл в Buffer.
       *
       * Multer сохранил файл на диск,
       * а теперь нам нужно передать его:
       *
       * 1. в LocalImageStorage;
       * 2. в ImageProcessor / Sharp.
       */
      const originalBuffer = await fs.readFile(originalFilePath);

      /*
       * ============================================================
       * 1. СОХРАНЯЕМ ОРИГИНАЛ
       * ============================================================
       */

      const original = await imageStorage.save(
        originalPath,
        originalBuffer,
        req.file.mimetype,
      );

      /*
       * Только после успешного save()
       * добавляем путь в список cleanup.
       */
      uploadedPaths.push(originalPath);

      /*
       * ============================================================
       * 2. СОЗДАЁМ PREVIEW И HERO
       * ============================================================
       */

      const { preview, hero } = await imageProcessor.process(originalBuffer);

      /*
       * ============================================================
       * 3. СОХРАНЯЕМ PREVIEW
       * ============================================================
       */

      const previewStored = await imageStorage.save(
        previewPath,
        preview,
        'image/webp',
      );

      uploadedPaths.push(previewPath);

      /*
       * ============================================================
       * 4. СОХРАНЯЕМ HERO
       * ============================================================
       */

      const heroStored = await imageStorage.save(heroPath, hero, 'image/webp');

      uploadedPaths.push(heroPath);

      /*
       * ============================================================
       * 5. ВОЗВРАЩАЕМ РЕЗУЛЬТАТ КЛИЕНТУ
       * ============================================================
       */

      return res.json({
        original: {
          path: original.path,
          url: original.url,
        },

        preview: {
          path: previewStored.path,
          url: previewStored.url,
        },

        hero: {
          path: heroStored.path,
          url: heroStored.url,
        },
      });
    } catch (error) {
      /*
       * Здесь может произойти ошибка:
       *
       * - чтения файла;
       * - Sharp;
       * - сохранения оригинала;
       * - сохранения preview;
       * - сохранения hero.
       */

      console.error('[Upload] Ошибка загрузки изображения:', error);

      /*
       * Если какая-то часть операции уже успела выполниться,
       * удаляем созданные файлы.
       *
       * Например:
       *
       * original     ✅
       * preview      ✅
       * hero         ❌
       *
       * uploadedPaths:
       *
       * [
       *   'cards/original/...',
       *   'cards/preview/...'
       * ]
       *
       * Эти два файла будут удалены.
       */
      await imageStorage.delete(uploadedPaths);

      return res.status(500).json({
        error: 'Не удалось загрузить изображение.',
      });
    } finally {
      /*
       * Этот блок выполняется ВСЕГДА:
       *
       * - если всё успешно;
       * - если Sharp упал;
       * - если storage.save() упал;
       * - если мы вернули 400;
       * - если произошла другая ошибка.
       *
       * Здесь удаляем временный файл,
       * созданный Multer.
       */
      if (req.file?.path) {
        try {
          await fs.unlink(req.file.path);
        } catch (unlinkError: unknown) {
          /*
           * ENOENT означает:
           * файл уже отсутствует.
           *
           * Это не является проблемой.
           */
          const code =
            typeof unlinkError === 'object' &&
            unlinkError !== null &&
            'code' in unlinkError
              ? unlinkError.code
              : undefined;

          if (code !== 'ENOENT') {
            console.warn(
              '[Upload] Не удалось удалить временный файл:',
              unlinkError,
            );
          }
        }
      }
    }
  },
);

export default router;
