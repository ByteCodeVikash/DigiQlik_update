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

    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Course ID is required' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if already purchased
    if (user.purchasedPlans.includes(courseId)) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course' });
    }

    // Logic for creating a payment session (e.g., Stripe/Razorpay) would go here
    // For now, we return a mock session ID
    const mockSessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;

    res.status(200).json({
      success: true,
      sessionId: mockSessionId,
      message: 'Purchase intent recorded. Ready for payment.'
    });
  } catch (error) {
    console.error('Purchase intent error:', error);
    res.status(401).json({ success: false, message: 'Session expired' });
  }
}
