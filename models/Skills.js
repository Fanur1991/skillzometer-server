import mongoose from 'mongoose';

const SkillsSchema = new mongoose.Schema(
  {
    skillId: {
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
    details: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Skills', SkillsSchema);
