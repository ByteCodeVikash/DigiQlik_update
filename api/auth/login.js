import dbConnect from '../_utils/db.js';
import User from '../_models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { contact, password } = req.body; // contact can be email or phone

    if (!contact || !password) {
      return res.status(400).json({ success: false, message: 'Contact and password are required' });
    }

    // [DEV BYPASS] Find user, or create a mock one if not found.
    let user = await User.findOne({
      $or: [{ email: contact }, { phone: contact }]
    });

    if (!user) {
      // Create a mock user on the fly if not found
      user = await User.create({
        name: contact.split('@')[0], // Use part of email as name
        email: contact.includes('@') ? contact : null,
        phone: !contact.includes('@') ? contact : null,
        password: 'mock_password',
        age: 20,
        purchasedPlans: [],
        accessStatus: 'active'
      });
    }

    // [DEV BYPASS] Skip password check

    // Create Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        purchasedPlans: user.purchasedPlans,
        accessStatus: user.accessStatus
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
}
