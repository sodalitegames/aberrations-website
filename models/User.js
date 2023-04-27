import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Must provide email.'],
    },
    stripeCustomerId: String,
    subscription: mongoose.Mixed,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
