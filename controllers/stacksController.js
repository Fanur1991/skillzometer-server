import Stacks from '../models/Stacks.js';
import Categories from '../models/Categories.js';
import Skills from '../models/Skills.js';
import User from '../models/User.js';

export const fetchStacks = async (req, res) => {
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

export const addUserStackRating = async (req, res) => {
  try {
    const { userId, stackData } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.stacksRating.push(stackData);

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateStackRating = async (req, res) => {
  try {
    const { userId, _id, stackRating } = req.body;

    const currUser = await User.findById(userId);

    if (!currUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stack = currUser.stacksRating.find((s) => s._id.equals(_id));
    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    stack.totalRating = stackRating;

    await currUser.save();

    const { passwordHash, ...user } = currUser._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const fetchCategories = async (req, res) => {
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

export const updateCategoryRating = async (req, res) => {
  try {
    const { userId, _id, categoryId, categoryRating } = req.body;

    const currUser = await User.findById(userId);
    if (!currUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stack = currUser.stacksRating.find((s) => s._id.equals(_id));
    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    const category = stack.categoriesRating.find((c) => {
      return c.categoryId === categoryId;
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.totalRating = categoryRating;

    stack.totalRating = stack.categoriesRating.reduce(
      (acc, curr) => acc + curr.totalRating,
      0
    );

    await currUser.save();

    const { passwordHash, ...user } = currUser._doc;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const fetchSkills = async (req, res) => {
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

export const updateSkillRating = async (req, res) => {
  try {
    const { userId, _id, categoryId, skillId, skillRating } = req.body;

    console.log('skillId', skillId);

    const currUser = await User.findById(userId);
    if (!currUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stack = currUser.stacksRating.find((s) => s._id.equals(_id));
    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    const category = stack.categoriesRating.find(
      (c) => c.categoryId === categoryId
    );
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const skill = category.skillsRating.find((s) => s.skillId === skillId);
    if (skill) {
      skill.rating = skillRating;
    } else {
      category.skillsRating.push({ skillId, rating: skillRating });
    }

    category.totalRating = category.skillsRating.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );

    stack.totalRating = stack.categoriesRating.reduce(
      (acc, curr) => acc + curr.totalRating,
      0
    );

    await currUser.save();

    const { passwordHash, ...user } = currUser._doc;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
