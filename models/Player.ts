import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Must provide email.'],
    },
    uid: {
      type: String,
      required: [true, 'Must provide uid.'],
    },
  },
  { timestamps: true }
);

export const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);
