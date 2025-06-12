import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'test-client',
  brokers: ['localhost:9092'],
});

async function testLargeMessage() {
  const producer = kafka.producer();
  const consumer = kafka.consumer({ groupId: 'test-group' });

  try {
    // Connect to Kafka
    await producer.connect();
    await consumer.connect();

    // Subscribe to the test topic
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

    // Create order event message
    const orderEvent = {
      userId: "user-uuid",
      type: "order_placed",
      orderId: "ORD123456",
      status: "placed",
      user: {
        name: "John Doe",
        email: "bnampellah1@gmail.com",
        phone: "+255742147567",
        fcmToken: "BJaCsWaGZ4gwC7_SFn88Vl0XuvQfQjCsWVnijdcoVk-QmB1mLOEVl7o07KmjF8NhWzSHh9VGhQSXgfJ1BBBgBI8"
      },
      channels: ["email", "sms", "push"],
      content: {
        title: "Order Placed Successfully",
        body: "Dear John Doe, your order ORD123456 has been placed successfully. We'll notify you when it ships."
      }
    };
    
    console.log('Sending order event to Kafka...');
    
    // Send the message
    await producer.send({
      topic: 'order-events',
      messages: [
        {
          value: JSON.stringify(orderEvent),
          headers: {
            'event-type': 'order_placed'
          }
        }
      ]
    });

    console.log('Message sent successfully!');

    // Wait for the message to be consumed
    await new Promise((resolve) => {
      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log('Received message:', {
            topic,
            partition,
            value: message.value?.toString(),
            headers: message.headers
          });
          resolve(true);
        }
      });
    });

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await producer.disconnect();
    await consumer.disconnect();
  }
}

// Run the test
testLargeMessage().catch(console.error); 