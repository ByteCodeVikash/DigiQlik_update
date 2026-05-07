import contentHandler from './_content.js';
import studentsHandler from './_students.js';
import setupHandler from './_setup.js';
import noticesHandler from './_notices.js';

export default async function handler(req, res) {
  const { resource } = req.query;

  switch (resource) {
    case 'content':
      return contentHandler(req, res);
    case 'students':
      return studentsHandler(req, res);
    case 'setup':
      return setupHandler(req, res);
    case 'notices':
      return noticesHandler(req, res);
    default:
      return res.status(404).json({ success: false, message: 'Admin resource not found' });
  }
}
