import mongoose from 'mongoose';
import Categories from '../models/Categories.js';

mongoose.connect(
  'mongodb+srv://fanur:fanur@cluster0.yqcao79.mongodb.net/mern-project'
);

export const getCategories = async (req, res) => {
  try {
    const data = await Categories.find();

    return res.json({
      data,
    });
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return res.status(500).json({
      message: 'Произошла ошибка при получении данных из базы данных',
    });
  }
};
