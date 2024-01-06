import fs from 'fs';
import User from '../models/User.js';

export const uploadAvatar = async (req, res) => {
  try {
    const imageUrl = `uploads/${req.file.filename}`;
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.avatarUrl && fs.existsSync(user.avatarUrl)) {
      fs.unlinkSync(user.avatarUrl);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: imageUrl,
      },
      { new: true }
    );

    const { passwordHash, ...userData } = updatedUser._doc;

    res.json({ user: userData });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteAvatar = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.avatarUrl && fs.existsSync(user.avatarUrl)) {
      fs.unlinkSync(user.avatarUrl);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { avatarUrl: '' } },
      { new: true }
    );

    const { passwordHash, ...userData } = updatedUser._doc;

    res.json({ user: userData });
  } catch (error) {
    console.error('Ошибка при удалении аватара:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
