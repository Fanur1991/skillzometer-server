import mongoose from 'mongoose';

const StacksSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    stackId: Number,
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Stacks', StacksSchema);
