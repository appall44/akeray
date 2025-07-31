import { registerAs } from '@nestjs/config';

export default registerAs('sms', () => ({
  apiKey: process.env.SMS_API_KEY,
  senderId: process.env.SMS_SENDER_ID,
  apiUrl: process.env.SMS_API_URL,
}));
