import mongoose from 'mongoose';

const SkillsProfileSchema = new mongoose.Schema({
  title: String,
  rating: Number,
});

export default mongoose.model('SkillsProfile', SkillsProfileSchema);
