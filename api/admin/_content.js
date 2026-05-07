import dbConnect from '../_utils/db.js';
import Content from '../_models/Content.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { courseId } = req.query;
      const filter = courseId ? { courseId } : {};
      const content = await Content.find(filter).sort({ order: 1, createdAt: -1 });
      res.status(200).json({ success: true, content });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch content' });
    }
  } else if (req.method === 'POST') {
    try {
      const newContent = await Content.create(req.body);
      res.status(201).json({ success: true, content: newContent });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create content' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Content.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Content deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete content' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
