import Stacks from '../models/Stacks.js';
import Categories from '../models/Categories.js';
import Skills from '../models/Skills.js';

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
