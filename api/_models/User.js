import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null if phone is provided
    lowercase: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    required: [true, 'Please provide your age'],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  purchasedPlans: {
    type: [String],
    default: [],
  },
  enrolledWorkshops: {
    type: [String],
    default: [],
  },
  accessStatus: {
    type: String,
    enum: ['active', 'suspended', 'pending'],
    default: 'active',
  },
  noticesVisible: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
