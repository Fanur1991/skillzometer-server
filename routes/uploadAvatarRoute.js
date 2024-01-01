import { Router } from 'express';
import multer from 'multer';
import { checkAuth } from '../utils/checkAuth.js';
import { uploadAvatar } from '../controllers/uploadAvatar.js';

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'uploads/');
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = new Router();

// Uploading avatar
// http://localhost:3002/api/auth/upload
router.post('/upload', checkAuth, upload.single('avatarUrl'), uploadAvatar);
// router.post('/upload', upload.single('avatarUrl'), uploadAvatar);

export default router;
