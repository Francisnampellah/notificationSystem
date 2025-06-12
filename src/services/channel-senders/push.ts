import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export async function sendPush(token: string, content: string) {
  try {
    const message = {
      notification: {
        title: 'Order Update',
        body: content,
      },
      token,
    };

    await admin.messaging().send(message);
    console.log(`Push notification sent to token: ${token}`);
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
} 