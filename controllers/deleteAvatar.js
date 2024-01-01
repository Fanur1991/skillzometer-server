import User from '../models/User.js';

export const deleteAvatar = async (req, res) => {
  try {
    const { userId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $unset: { avatarUrl: '' } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...user } = updatedUser._doc;

    res.json({ user });
  } catch (error) {
    console.error('Ошибка при удалении аватара:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
