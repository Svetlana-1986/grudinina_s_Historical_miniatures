import sharp from 'sharp';

export interface ProcessedImages {
  preview: Buffer;
  hero: Buffer;
}

const PREVIEW_WIDTH = 400;
const PREVIEW_QUALITY = 80;

const HERO_WIDTH = 1600;
const HERO_QUALITY = 90;

export class ImageProcessor {
  async process(originalBuffer: Buffer): Promise<ProcessedImages> {
    const [preview, hero] = await Promise.all([
      sharp(originalBuffer)
        .resize({
          width: PREVIEW_WIDTH,
          withoutEnlargement: true,
        })
        .webp({
          quality: PREVIEW_QUALITY,
        })
        .toBuffer(),

      sharp(originalBuffer)
        .resize({
          width: HERO_WIDTH,
          withoutEnlargement: true,
        })
        .webp({
          quality: HERO_QUALITY,
        })
        .toBuffer(),
    ]);

    return {
      preview,
      hero,
    };
  }
}
