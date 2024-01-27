import mongoose from 'mongoose';

const StacksProfileSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  categoriesRating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CategoriesProfile',
    },
  ],
});

export default mongoose.model('StacksProfile', StacksProfileSchema);
