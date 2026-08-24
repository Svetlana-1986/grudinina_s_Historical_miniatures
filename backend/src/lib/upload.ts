import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads/cards');

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 МБ

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

fs.mkdirSync(UPLOAD_DIR, {
  recursive: true,
});

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },

  filename(_req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    const uniqueName = `${crypto.randomUUID()}${extension}`;

    cb(null, uniqueName);
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: MAX_IMAGE_SIZE,
  },

  fileFilter(_req, file, cb) {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      cb(new Error('UNSUPPORTED_IMAGE_TYPE'));
      return;
    }

    cb(null, true);
  },
});
