import mongoose from 'mongoose';
import Stacks from '../models/Stacks.js';

mongoose.connect(
  'mongodb+srv://fanur:fanur@cluster0.yqcao79.mongodb.net/mern-project'
);

export const getStacks = async (req, res) => {
  try {
    const data = await Stacks.find();

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
