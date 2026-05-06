import dbConnect from '../_utils/db.js';
import Notice from '../_models/Notice.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const notices = await Notice.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notices' });
  }
}
