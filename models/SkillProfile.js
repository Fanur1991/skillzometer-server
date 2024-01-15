import mongoose from 'mongoose';

const SkillProfileSchema = new mongoose.Schema({
  stacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stacks',
    },
  ],
  skillRatings: [
    {
      skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills',
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model('SkillProfile', SkillProfileSchema);
