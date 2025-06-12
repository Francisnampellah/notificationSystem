# Notification System

A scalable and maintainable notification system for e-commerce platforms, built with Node.js, Kafka, and Prisma.

## Features

- Real-time event processing with Kafka
- Multiple notification channels (Email via Google SMTP, SMS, Push)
- User preference management
- Template-based notifications
- Scalable architecture

## Prerequisites

- Node.js 16+
- Docker and Docker Compose
- PostgreSQL
- Google Account (for SMTP)
- Twilio account
- Firebase project

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd notification-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

### Google SMTP Setup
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Generate an App Password:
   - Go to Security > App Passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password
4. Update your `.env` file with:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_FROM=your-email@gmail.com
   ```

4. Start the infrastructure:
```bash
docker-compose up -d
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. Start the service:
```bash
npm run dev
```

## Testing

To test the notification system, you can publish an event to Kafka:

```json
{
  "userId": "user-uuid",
  "type": "order_placed",
  "orderId": "ORD123456",
  "status": "placed",
  "user": {
    "name": "John Doe"
  }
}
```

## Architecture

- **Kafka**: Event streaming platform
- **Prisma**: ORM for database operations
- **PostgreSQL**: Database
- **Google SMTP**: Email notifications
- **Twilio**: SMS notifications
- **Firebase**: Push notifications

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT # notificationSystem
