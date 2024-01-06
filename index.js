import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import stacksRoute from './routes/stacksRoute.js';
import loadDataRoute from './routes/loadDataRoute.js';
import userRoute from './routes/userRoute.js';
import userAvatarRoute from './routes/userAvatarRoute.js';
import projectsRoute from './routes/projectsRoute.js';

const app = express();
dotenv.config();

// Constants
export const PORT = process.env.PORT || 3001;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//Routes
// http://localhost:3002/api/
app.use('/api/auth', authRoute);
app.use('/api/auth/user', userRoute);
app.use('/api/auth', userAvatarRoute);
app.use('/api/auth/projects', projectsRoute);
app.use('/api', stacksRoute);
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
