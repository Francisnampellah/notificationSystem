import nodemailer from 'nodemailer';

// Create reusable transporter object using Google SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, content: string) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject: 'Order Update',
      text: content,
      html: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
} 