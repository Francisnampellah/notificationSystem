import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, content: string) {
  try {
    await client.messages.create({
      body: content,
      to,
      from: process.env.TWILIO_PHONE,
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
} 