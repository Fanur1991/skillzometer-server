import { Router } from 'express';
import multer from 'multer';
import { checkAuth } from '../utils/checkAuth.js';
import {
  uploadAvatar,
  deleteAvatar,
} from '../controllers/userAvatarController.js';

export const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'uploads/');
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = new Router();

// Upload avatar
// http://localhost:3002/api/auth/upload
router.post('/upload', checkAuth, upload.single('avatarUrl'), uploadAvatar);

// Delete avatar
// http://localhost:3002/api/auth/delete-avatar
router.post('/delete-avatar', checkAuth, deleteAvatar);

export default router;
