import dbConnect from '../_utils/db.js';
import Notice from '../_models/Notice.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const notices = await Notice.find({ active: true }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, notices });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch notices' });
    }
  } else if (req.method === 'POST') {
    try {
      const newNotice = await Notice.create(req.body);
      res.status(201).json({ success: true, notice: newNotice });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create notice' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Notice.findByIdAndUpdate(id, { active: false });
      res.status(200).json({ success: true, message: 'Notice deactivated' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete notice' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
