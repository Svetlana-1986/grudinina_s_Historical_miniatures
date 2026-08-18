import fs from 'fs/promises';
import path from 'path';

import type { ImageStorage, StoredImage } from './ImageStorage.js';

const STORAGE_ROOT = path.resolve(process.cwd(), 'uploads');

export class LocalImageStorage implements ImageStorage {
  private resolvePath(imagePath: string): string {
    const fullPath = path.resolve(STORAGE_ROOT, imagePath);

    const relativePath = path.relative(STORAGE_ROOT, fullPath);

    if (
      relativePath.startsWith(`..${path.sep}`) ||
      relativePath === '..' ||
      path.isAbsolute(relativePath)
    ) {
      throw new Error(`Недопустимый путь изображения: ${imagePath}`);
    }

    return fullPath;
  }

  async save(
    imagePath: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<StoredImage> {
    void contentType;

    const fullPath = this.resolvePath(imagePath);

    await fs.mkdir(path.dirname(fullPath), {
      recursive: true,
    });

    const PUBLIC_API_URL = process.env.PUBLIC_API_URL;

    if (!PUBLIC_API_URL) {
      throw new Error('PUBLIC_API_URL не задан.');
    }

    await fs.writeFile(fullPath, buffer);

    return {
      path: imagePath,
      url: `${PUBLIC_API_URL}/uploads/${imagePath}`,
    };
  }

  async delete(paths: string[]): Promise<void> {
    await Promise.all(
      paths.map(async (imagePath) => {
        const fullPath = this.resolvePath(imagePath);

        try {
          await fs.unlink(fullPath);
        } catch (error: unknown) {
          const code =
            typeof error === 'object' && error !== null && 'code' in error
              ? error.code
              : undefined;

          if (code !== 'ENOENT') {
            console.error(
              `[LocalImageStorage] Не удалось удалить файл ${imagePath}:`,
              error,
            );
          }
        }
      }),
    );
  }
}
