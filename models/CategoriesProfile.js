import mongoose from 'mongoose';

const CategoriesProfileSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  skillsRating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SkillsProfile',
    },
  ],
});

export default mongoose.model('CategoriesProfile', CategoriesProfileSchema);
