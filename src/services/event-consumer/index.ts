import { Kafka, Consumer } from 'kafkajs';
import { processNotification } from '../notification-worker';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

export async function startEventConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC || 'order-events',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const event = JSON.parse(message.value?.toString() || '{}');
          console.log(`Processing event: ${JSON.stringify(event)}`);
          
          await processNotification(event);
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });

    console.log('Event consumer started successfully');
  } catch (error) {
    console.error('Error starting event consumer:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  try {
    await consumer.disconnect();
    console.log('Consumer disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}); 