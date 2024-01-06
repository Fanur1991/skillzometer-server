import User from '../models/User.js';

export const addProjects = async (req, res) => {
  try {
    const { userId, projectData } = req.body;

    if (!userId || !projectData) {
      return res.status(400).json({ message: 'Недостаточно данных' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.projects.push(projectData);
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка с получением данных' });
  }
};

export const fetchProjects = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Не указан идентификатор пользователя' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
};

export const deleteProjects = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.query;

    if (!projectId || !userId) {
      return res.status(400).json({
        message: 'Отсутствует идентификатор проекта или пользователя',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.projects = user.projects.filter((project) => project.id !== projectId);
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка на сервере' });
  }
};
