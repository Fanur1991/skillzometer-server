import saveStack from '../utils/saveStack.js';

// Endpoint для загрузки данных
export const loadData = async (req, res) => {
  try {
    const body = req.body;

    await saveStack(body.stack);

    res.status(200).json({ message: 'Данные загружены успешно' });
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
    res.status(500).json({
      message: 'Произошла ошибка при загрузке данных',
    });
  }
};
