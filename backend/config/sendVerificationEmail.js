import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

  await resend.emails.send({
    from: 'Invideo <onboarding@resend.dev>',
    to: [email],
    subject: 'Verify Your Email',
    html: `<p>Please <a href="${verificationUrl}">click here</a> to verify your email.</p>`,
  });
};
