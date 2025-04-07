import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  // const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  const verificationUrl = `${process.env.CLIENT_URL}/api/verify/${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9; color: #333;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <div style="padding: 20px; border-bottom: 1px solid #eee;">
          <h2 style="color: #4CAF50;">Welcome to Invideo 🎉</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hi there,</p>
          <p>Thanks for signing up! Please click the button below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p>If you did not sign up for Invideo, you can safely ignore this email.</p>
        </div>
        <div style="padding: 20px; font-size: 12px; color: #999; border-top: 1px solid #eee;">
          &copy; ${new Date().getFullYear()} Invideo. All rights reserved.
        </div>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: 'Invideo <onboarding@resend.dev>',
    to: [email],
    subject: 'Verify Your Email Address',
    html: htmlContent,
  });
};
