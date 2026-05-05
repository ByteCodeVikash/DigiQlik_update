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
    const { name, email, phone, password, age } = req.body;

    if (!name || !age || (!email && !phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, Age and at least one contact (Email or Phone) are required' 
      });
    }

    // [DEV BYPASS] No strict validation. Just find or create.
    let user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (user) {
      // If user exists, just update their name/age for this dev session
      user.name = name;
      user.age = age;
      await user.save();
    } else {
      // Hash password if provided, otherwise null is fine for dev
      let hashedPassword = null;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        age,
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

    res.status(201).json({
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
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
}
