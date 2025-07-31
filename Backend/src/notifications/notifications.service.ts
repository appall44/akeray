import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  async sendSms(to: string, message: string): Promise<void> {
    const apiKey = process.env.GEEZ_SMS_API_KEY;
    const senderId = process.env.GEEZ_SMS_SENDER_ID;
    
    const response = await axios.post('https://api.geezsms.com/v1/send', {
      api_key: apiKey,
      to,
      message,
      sender_id: senderId,
    });
    
    if (response.data.status !== 'success') {
      throw new Error('SMS sending failed');
    }
  }
}