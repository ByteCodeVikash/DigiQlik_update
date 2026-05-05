import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['recorded', 'live', 'upcoming'],
    required: true,
  },
  courseId: {
    type: String, // e.g., 'dm-mastery', 'seo-growth'
    required: true,
  },
  url: {
    type: String, // Video embed link or Meeting link
  },
  thumbnail: {
    type: String,
  },
  scheduledAt: {
    type: Date,
  },
  duration: {
    type: String, // e.g., '1h 30m'
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
