import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'urgent'],
    default: 'info',
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
