import mongoose from 'mongoose';

const SkillRatingSchema = new mongoose.Schema({
  title: String,
  desc: String,
  skillId: Number,
  rating: {
    type: Number,
    default: 0,
  },
});

const CategoryRatingSchema = new mongoose.Schema({
  title: String,
  desc: String,
  categoryId: Number,
  skillsRating: [SkillRatingSchema],
  totalRating: {
    type: Number,
    default: 0,
  },
});

const StackRatingSchema = new mongoose.Schema({
  title: String,
  desc: String,
  stackId: Number,
  categoriesRating: [CategoryRatingSchema],
  totalRating: {
    type: Number,
    default: 0,
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    firstname: String,
    lastname: String,
    githubUrl: String,
    linkedinUrl: String,
    websiteUrl: String,
    avatarUrl: String,
    projects: Array,
    stacksRating: [StackRatingSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
