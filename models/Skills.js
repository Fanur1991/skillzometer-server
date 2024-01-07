import mongoose from 'mongoose';

const SkillsSchema = new mongoose.Schema(
  {
    hashId: {
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
