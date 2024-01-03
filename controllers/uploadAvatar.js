import User from '../models/User.js';

export const uploadAvatar = async (req, res) => {
  try {
    const imageUrl = `uploads/${req.file.filename}`;
    const { userId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: imageUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...user } = updatedUser._doc;

    res.json({ user });
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
