import express from 'express';
import UserModel from '../models/userModel.js';

const router = express.Router();

router.get('/verify-email/:token', async (req, res) => {
  try {
    const user = await UserModel.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

export default router;
