import mongoose from 'mongoose';

const StacksSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    name: {
      type: Object,
      required: true,
    },
    desc: {
      type: Object,
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
