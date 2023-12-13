import mongoose from 'mongoose';
import Skills from '../models/Skills.js';

mongoose.connect(
  'mongodb+srv://fanur:fanur@cluster0.yqcao79.mongodb.net/mern-project'
);

export const getSkills = async (req, res) => {
  try {
    const data = await Skills.find();
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
