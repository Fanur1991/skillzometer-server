import mongoose from 'mongoose';

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
    surname: String,
    githubUrl: String,
    linkedinUrl: String,
    websiteUrl: String,
    avatarUrl: String,
    projects: Array,
    stacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stacks',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
