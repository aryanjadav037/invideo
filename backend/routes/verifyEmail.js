import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
