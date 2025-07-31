import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const mailOptions = {
      from: `"Akeray Property Management System" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Akeray Property Management System - Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
     html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #077f88; color: #fff; padding: 20px; text-align: center;">
      <h2 style="margin: 0;">Akeray Property Management System</h2>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333; text-align: justify; line-height: 1.6;">
        Welcome to <strong>Akeray Property Management System</strong><br><br>
        The Akeray Property Management System (APMS) is a robust, cloud-based solution developed to streamline the operational and administrative functions of property management. It automates leasing, unit management, maintenance, financial operations, and customer notifications, ensuring efficiency, scalability, and compliance with modern data security standards.<br><br>
        Please use the following OTP to complete your verification process. This OTP is valid for <strong>3 minutes</strong>.
      </p>
      <div style="text-align: center; font-size: 32px; font-weight: bold; color: #0f7dc7; margin: 20px 0;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this, please ignore this email.</p>
    </div>
    <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666;">
      &copy; ${new Date().getFullYear()} Akeray Property Management System. All rights reserved.
    </div>
  </div>
`,

    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`OTP email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${to}`, error);
      throw error;
    }
  }
}
