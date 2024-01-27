import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Categories', CategoriesSchema);
