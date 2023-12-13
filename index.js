import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import stacksRoute from './routes/stacks.js';
import categoriesRoute from './routes/categories.js';
import skillsRoute from './routes/skills.js';
import loadDataRoute from './routes/loadData.js';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());

//Routes
// http://localhost:3002/api
app.use('/api/auth', authRoute);
app.use('/api/stacks', stacksRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/load', loadDataRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yqcao79.mongodb.net/${DB_NAME}`
    );
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
