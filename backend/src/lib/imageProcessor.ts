import sharp from 'sharp';

import path from 'path';

import fs from 'fs/promises';

export const processImage = async (sourcePath: string, fileName: string) => {
  const uploadsDir = path.join(process.cwd(), 'uploads', 'cards');

  const previewDir = path.join(uploadsDir, 'preview');

  const heroDir = path.join(uploadsDir, 'hero');

  await fs.mkdir(previewDir, {
    recursive: true,
  });

  await fs.mkdir(heroDir, {
    recursive: true,
  });

  const webpFileName = fileName.replace(/\.[^.]+$/, '') + '.webp';

  await sharp(sourcePath)
    .resize({
      width: 400,
      height: 500,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toFile(path.join(previewDir, webpFileName));

  await sharp(sourcePath)
    .resize({
      width: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 90,
    })
    .toFile(path.join(heroDir, webpFileName));

  return {
    previewUrl: `/uploads/cards/preview/${webpFileName}`,

    heroUrl: `/uploads/cards/hero/${webpFileName}`,
  };
};
