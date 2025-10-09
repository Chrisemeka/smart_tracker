import { Resend } from 'resend';

interface emailData {
  email: string;
  otp: string;
  userName?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const generateEmailTemplate = (options: emailData): string => {
    const { userName, otp } = options;

    return `
       <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .container {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .otp-box {
          text-align: center;
          background-color: #030213;
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Email Verification</h1>
        </div>
        
        <p>Hello <strong>${userName || 'there'}</strong>,</p>
        
        <p>Please use the OTP below to verify your email address and complete your registration:</p>
        
        <div class="otp-box">
          ${otp}
        </div>
        
        <div class="warning">
          <strong>⚠️ Important:</strong> This OTP will expire in 10 minutes. Please do not share it with anyone. If you didn't request this email, please ignore it.
        </div>
        
        <div class="footer">
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          <p>This is an automated message, please do not reply.</p>
          <p style="margin-top: 20px; color: #999;">© ${new Date().getFullYear()} TrackSpace. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;     
}

export default async function sendOtpEmail(options: emailData) {
    try {
        if (!options.email || !options.otp) {
            throw new Error('Email and OTP are required');
        }

        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not configured');
        }

        const htmlContent = generateEmailTemplate(options);

        const { data, error } = await resend.emails.send({
            from: 'TrackSpace <onboarding@resend.dev>', 
            to: options.email,
            subject: 'Verify Your Email - TrackSpace',
            html: htmlContent,
            text: `
              Hello ${options.userName || 'there'},

              Please verify your email with this OTP: ${options.otp}

              This OTP will expire in 10 minutes.

              If you didn't request this email, please ignore it.

              Best regards,
              TrackSpace Team
                          `,
        });

        if (error) {
            console.error('Resend API error:', error);
            return {
                success: false,
                message: 'Failed to send OTP to email',
                error: error
            };
        }

        console.log('Email sent successfully via Resend:', data);

        return {
            success: true,
            message: {
                id: data?.id || 'unknown',
                res: 'Message sent successfully via Resend',
                response: 'Email queued for delivery',
                accepted: [options.email],
                rejected: []
            },
        };

    } catch (error: any) {
        console.error('Error sending OTP email:', error);
        return {
            success: false,
            message: 'Failed to send OTP to email',
            error: error.message || error
        };
    }
}