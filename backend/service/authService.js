import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from '../config/sendVerificationEmail.js';

class AuthService {
  constructor(userModel, tokenService) {
    this.userModel = userModel;
    this.tokenService = tokenService;
  }

  async register(Username, Full_Name, email, password, dob, role) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await this.userModel.create({
      Username,
      Full_Name,
      email,
      password: hashedPassword,
      dob,
      role,
      verificationToken,
      isVerified: false
    });

    await sendVerificationEmail(email, verificationToken);

    return { message: 'Verification email sent. Please verify to continue.' };
  }

  async authenticate(email, password) {
    const user = await this.userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email before logging in.');
    }

    return this.tokenService.generateToken(user);
  }
  
  async registerGoogle(Username, Full_Name, email, password, dob, role) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      return existingUser; // Return the actual user object instead of just a message
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userModel.create({
      Username,
      Full_Name,
      email,
      password: hashedPassword,
      dob,
      role,
      verificationToken: null,
      isVerified: true
    });

    return newUser; // Return the user object for token generation
  }

  async verifyEmail(token) {
    try {
      const user = await this.userModel.findOne({ verificationToken: token });

      if (!user) {
        return 'Invalid or expired token';
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      return 'Email verified successfully';
    } catch (error) {
      console.error('Verification error:', error);
      throw new Error('Internal Server Error');
    }
  }
  
  async logout(res) {
    //local
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    });

    //deployment
    // res.clearCookie("auth_token", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    // });
  }

  // Add this helper method for password hashing
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

export default AuthService;