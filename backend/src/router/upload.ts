import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { upload } from '../lib/upload.js';

const router = Router();

const previewDir = path.resolve(process.cwd(), 'uploads/cards/preview');

const heroDir = path.resolve(process.cwd(), 'uploads/cards/hero');

fs.mkdirSync(previewDir, {
  recursive: true,
});

fs.mkdirSync(heroDir, {
  recursive: true,
});

router.post(
  '/upload/card-image',
  upload.single('image'),

  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'File required',
        });
      }

      const originalFilePath = req.file.path;

      const fileNameWithoutExt = path.parse(req.file.filename).name;

      const previewFileName = `${fileNameWithoutExt}.webp`;

      const heroFileName = `${fileNameWithoutExt}.webp`;

      const previewFilePath = path.join(previewDir, previewFileName);

      const heroFilePath = path.join(heroDir, heroFileName);

      await sharp(originalFilePath)
        .resize({
          width: 400,
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
        })
        .toFile(previewFilePath);

      await sharp(originalFilePath)
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 90,
        })
        .toFile(heroFilePath);

      return res.json({
        originalUrl: `/uploads/cards/${req.file.filename}`,

        previewUrl: `/uploads/cards/preview/${previewFileName}`,

        heroUrl: `/uploads/cards/hero/${heroFileName}`,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: 'Upload failed',
      });
    }
  },
);

export default router;
