import dbConnect from '../_utils/db.js';
import Content from '../_models/Content.js';
import User from '../_models/User.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
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

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { purchasedPlans = [] } = user;

    if (purchasedPlans.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'No purchased plans found', 
        content: { recorded: [], live: [], upcoming: [] } 
      });
    }

    // Fetch content only for purchased plans
    const allContent = await Content.find({
      courseId: { $in: purchasedPlans }
    }).sort({ order: 1, scheduledAt: 1 });

    const content = {
      recorded: allContent.filter(c => c.type === 'recorded'),
      live: allContent.filter(c => c.type === 'live'),
      upcoming: allContent.filter(c => c.type === 'upcoming'),
    };

    res.status(200).json({
      success: true,
      content,
      user: {
        name: user.name,
        purchasedPlans: user.purchasedPlans
      }
    });
  } catch (error) {
    console.error('Dashboard content error:', error);
    res.status(401).json({ success: false, message: 'Invalid token or session expired' });
  }
}
