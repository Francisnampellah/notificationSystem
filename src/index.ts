import 'dotenv/config';
import { startEventConsumer } from './services/event-consumer';

async function main() {
  try {
    console.log('Starting notification service...');
    await startEventConsumer();
  } catch (error) {
    console.error('Error starting service:', error);
    process.exit(1);
  }
}

main(); 