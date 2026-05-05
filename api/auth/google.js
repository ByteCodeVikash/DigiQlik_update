import dbConnect from '../_utils/db.js';
import User from '../_models/User.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ success: false, message: 'Google credential is required' });
  }

  try {
    // [DEV BYPASS] Skip strict Google token verification
    // For dev, we just mock the google data if credential isn't a real token
    let googleData = { sub: 'mock_google_id', email: 'google@mock.com', name: 'Google User' };
    
    try {
      if (credential && credential.length > 50) { // basic check for actual token string
        const googleRes = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        googleData = googleRes.data;
      }
    } catch (e) {
      console.warn('Google Token verification failed, using mock data.');
    }

    const { sub: googleId, email, name } = googleData;
    await dbConnect();

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email: email,
        googleId: googleId,
        age: 20,
        purchasedPlans: [],
        accessStatus: 'active'
      });
    }

    // Create Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Google Auth error:', error);
    res.status(500).json({ success: false, message: 'Google Auth failed' });
  }
}
