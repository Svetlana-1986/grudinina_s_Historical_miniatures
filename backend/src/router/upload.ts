import { Router } from 'express';

import { upload } from '../lib/upload.js';



const router = Router();

router.post(
  '/upload/card-image',
  upload.single('image'),

  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        error: 'File required',
      });
    }

    return res.json({
      url: `/uploads/cards/${req.file.filename}`,
    });
  },
);

export default router;
