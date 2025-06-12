import { sendEmail } from '../channel-senders/email';
import { sendSMS } from '../channel-senders/sms';
import { sendPush } from '../channel-senders/push';

interface NotificationEvent {
  userId: string;
  type: string;
  orderId: string;
  status: string;
  user: {
    name: string;
    email?: string;
    phone?: string;
    fcmToken?: string;
  };
  channels: string[];
  content: {
    title: string;
    body: string;
  };
}

export async function processNotification(event: NotificationEvent) {
  try {
    // Send notifications through specified channels
    const notificationPromises = event.channels.map(async (channel) => {
      switch (channel) {
        case 'email':
          if (event.user.email) {
            await sendEmail(event.user.email, `${event.content.title}\n\n${event.content.body}`);
          }
          break;
        case 'sms':
          if (event.user.phone) {
            await sendSMS(event.user.phone, `${event.content.title} - ${event.content.body}`);
          }
          break;
        case 'push':
          if (event.user.fcmToken) {
            await sendPush(event.user.fcmToken, `${event.content.title}\n\n${event.content.body}`);
          }
          break;
      }
    });

    await Promise.all(notificationPromises);
    console.log(`Notifications sent for event: ${event.type}`);
  } catch (error) {
    console.error('Error processing notification:', error);
    throw error;
  }
} 