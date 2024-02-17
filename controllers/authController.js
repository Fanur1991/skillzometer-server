import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

// Register user
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }

    const { email, password } = req.body;
    const isUsed = await User.findOne({ email });

    if (isUsed) {
      return res.status(400).json({
        message: 'Данный email уже занят, попробуйте другой',
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userDocument = new User({
      email,
      passwordHash: hash,
    });

    const newUser = await userDocument.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { passwordHash, ...user } = newUser._doc;

    res.json({
      token,
      user,
      message: 'Регистрация прошла успешно',
    });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось зарегистрироваться, попробуйте заново' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    const { email, password } = req.body;

    const authUser = await User.findOne({ email });

    if (!authUser) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      authUser.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: authUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const { passwordHash, ...user } = authUser._doc;

    res.json({
      token,
      user,
      message: 'Вы вошли в систему',
    });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось авторизоваться' });
  }
};

//Get me
export const getMe = async (req, res) => {
  try {
    const currUser = await User.findById(req.userId);

    if (!currUser) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...user } = currUser._doc;

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: 'Нет доступа',
    });
  }
};
