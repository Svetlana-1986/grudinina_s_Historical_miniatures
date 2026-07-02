import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { upload } from '../lib/upload.js';
import { supabase } from '../lib/supabase.js';

const router = Router();

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

      const previewFileName = `${fileNameWithoutExt}-preview.webp`;

      const heroFileName = `${fileNameWithoutExt}-hero.webp`;

      const previewBuffer = await sharp(originalFilePath)
        .resize({
          width: 400,
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
        })
        .toBuffer();

      const heroBuffer = await sharp(originalFilePath)
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 90,
        })
        .toBuffer();

      const { error: previewError } = await supabase.storage
        .from('cards')
        .upload(`preview/${previewFileName}`, previewBuffer, {
          contentType: 'image/webp',
          upsert: false,
        });

      if (previewError) {
        throw previewError;
      }

      const { error: heroError } = await supabase.storage
        .from('cards')
        .upload(`hero/${heroFileName}`, heroBuffer, {
          contentType: 'image/webp',
          upsert: false,
        });

      if (heroError) {
        throw heroError;
      }

      const previewUrl = supabase.storage
        .from('cards')
        .getPublicUrl(`preview/${previewFileName}`).data.publicUrl;

      const heroUrl = supabase.storage
        .from('cards')
        .getPublicUrl(`hero/${heroFileName}`).data.publicUrl;

      fs.unlinkSync(originalFilePath);

      return res.json({
        previewUrl,
        heroUrl,
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
