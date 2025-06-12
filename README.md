# Notification System

A scalable notification system built with Node.js, Kafka, and TypeScript.

## Features

- Event-driven architecture using Kafka
- Multiple notification channels (Email, SMS, Push)
- TypeScript for type safety
- Docker-based deployment
- Scalable and maintainable design

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Kafka
- PostgreSQL

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Kafka
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=notification-service
KAFKA_CONSUMER_GROUP=notification-group

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# SMS (Twilio)
TWILIO_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE=your-twilio-phone-number

# Firebase (Push Notifications)
GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-credentials.json
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notification-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the services:
```bash
docker-compose up -d
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

## Testing

To test the notification system, you can publish an event to Kafka. The event should include all necessary user and notification details:

```json
{
  "userId": "user-uuid",
  "type": "order_placed",
  "orderId": "ORD123456",
  "status": "placed",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "fcmToken": "fcm-token-123"
  },
  "channels": ["email", "sms", "push"],
  "content": {
    "title": "Order Placed Successfully",
    "body": "Dear John Doe, your order ORD123456 has been placed successfully. We'll notify you when it ships."
  }
}
```

Run the test script:
```bash
npm run test
```

## Architecture

The system follows an event-driven architecture:

1. **Event Producer**: Publishes notification events to Kafka
2. **Event Consumer**: Processes events and sends notifications through configured channels
3. **Channel Senders**: Handle the actual sending of notifications through different channels (email, SMS, push)

### Event Flow

1. An event is published to the `order-events` topic
2. The notification worker consumes the event
3. Based on the event data, notifications are sent through the specified channels
4. Each channel sender handles the specific requirements of its notification type

## Development

Start the development server:
```bash
npm run dev
```

The server will automatically restart when you make changes to the code.

## Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
