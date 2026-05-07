import dbConnect from '../_utils/db.js';
import User from '../_models/User.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const adminEmail = 'admin@digiqlik.com';
    const adminPassword = 'admin@12';
    const adminName = 'DigiQlik Admin';

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      // Update role and password to ensure it's correct
      const salt = await bcrypt.genSalt(10);
      admin.role = 'admin';
      admin.password = await bcrypt.hash(adminPassword, salt);
      admin.name = adminName;
      await admin.save();

      return res.status(200).json({
        success: true,
        message: 'Admin account updated successfully.',
        credentials: { email: adminEmail, password: adminPassword }
      });
    }

    // Create new admin account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      age: 'N/A',
      phone: '',
      role: 'admin',
      purchasedPlans: [],
      accessStatus: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully!',
      credentials: { email: adminEmail, password: adminPassword }
    });

  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({ success: false, message: 'Setup failed', error: error.message });
  }
}
