import dbConnect from '../_utils/db.js';
import User from '../_models/User.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    await dbConnect();

    const { courseId, transactionId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    // In a real app, verify transactionId with payment gateway here

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Add course to user's plans if not already there
    if (!user.purchasedPlans.includes(courseId)) {
      user.purchasedPlans.push(courseId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment successful! Welcome to the course.',
      user: {
        purchasedPlans: user.purchasedPlans
      }
    });
  } catch (error) {
    console.error('Purchase verify error:', error);
    res.status(401).json({ success: false, message: 'Session expired' });
  }
}
