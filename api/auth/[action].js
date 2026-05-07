import loginHandler from './_login.js';
import signupHandler from './_signup.js';
import googleHandler from './_google.js';
import meHandler from './_me.js';

export default async function handler(req, res) {
  const { action } = req.query;

  switch (action) {
    case 'login':
      return loginHandler(req, res);
    case 'signup':
      return signupHandler(req, res);
    case 'google':
      return googleHandler(req, res);
    case 'me':
      return meHandler(req, res);
    default:
      return res.status(404).json({ success: false, message: 'Action not found' });
  }
}
