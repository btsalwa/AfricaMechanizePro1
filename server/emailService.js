import nodemailer from 'nodemailer';

// Email configuration
let transporter;

if (process.env.SENDGRID_API_KEY) {
  // SendGrid configuration
  transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });
} else if (process.env.SMTP_HOST) {
  // SMTP configuration
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
} else {
  // Development mode - use ethereal email for testing
  console.log('⚠️  No email service configured. Using test account for development.');
  
  // Create test account for development
  const testAccount = {
    user: 'noreply@africamechanize.org',
    pass: 'development-only',
  };
  
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: testAccount,
  });
}

export async function sendEmail({ to, subject, text, html }) {
  try {
    if (!transporter) {
      console.error('Email transporter not configured');
      return false;
    }
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@africamechanize.org',
      to,
      subject,
      text: text || html?.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email sent:', {
        to,
        subject,
        messageId: info.messageId,
        previewURL: nodemailer.getTestMessageUrl(info),
      });
    }
    
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export async function sendWelcomeEmail(user) {
  return await sendEmail({
    to: user.email,
    subject: 'Welcome to Africa Mechanize!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to Africa Mechanize!</h1>
        </div>
        <div style="padding: 30px 20px; background: white;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${user.firstName}!</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Welcome to the Africa Mechanize platform! You're now part of a community dedicated to 
            promoting sustainable agricultural mechanization across Africa.
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #22c55e; margin-top: 0;">What you can do now:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Explore the F-SAMA Framework elements</li>
              <li>Join upcoming webinars and conferences</li>
              <li>Access our resource library</li>
              <li>Connect with other professionals</li>
              <li>Submit abstracts to conferences</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.BASE_URL || 'http://localhost:5000'}" 
               style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; 
                      border-radius: 6px; font-weight: 600; display: inline-block;">
              Get Started
            </a>
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          © 2025 Africa Mechanize. All rights reserved.
        </div>
      </div>
    `
  });
}