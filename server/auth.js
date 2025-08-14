import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { users } from '../shared/schema.js';
import { db } from './db.js';
import { eq, and, gt } from 'drizzle-orm';
import { sendEmail } from './emailService.js';

// Configure local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find user by email
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    
    if (!user.isActive) {
      return done(null, false, { message: 'Account is deactivated' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    
    // Update last login
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Authentication helper functions
export const authHelpers = {
  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  },
  
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  },
  
  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  },
  
  async createUser(userData) {
    const hashedPassword = await this.hashPassword(userData.password);
    const emailVerificationToken = this.generateToken();
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    const [newUser] = await db.insert(users).values({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
      organization: userData.organization,
      country: userData.country,
      emailVerificationToken,
      emailVerificationExpires,
      isEmailVerified: false,
      isActive: true,
    }).returning();
    
    // Send verification email
    if (process.env.NODE_ENV !== 'test') {
      await this.sendVerificationEmail(newUser.email, emailVerificationToken);
    }
    
    return newUser;
  },
  
  async verifyEmail(token) {
    const [user] = await db.select().from(users).where(
      and(
        eq(users.emailVerificationToken, token),
        gt(users.emailVerificationExpires, new Date())
      )
    );
    
    if (!user) {
      throw new Error('Invalid or expired verification token');
    }
    
    await db.update(users)
      .set({
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      })
      .where(eq(users.id, user.id));
    
    return user;
  },
  
  async sendPasswordReset(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) {
      throw new Error('User not found');
    }
    
    const resetToken = this.generateToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    await db.update(users)
      .set({
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      })
      .where(eq(users.id, user.id));
    
    // Send password reset email
    if (process.env.NODE_ENV !== 'test') {
      await this.sendPasswordResetEmail(user.email, resetToken);
    }
    
    return resetToken;
  },
  
  async resetPassword(token, newPassword) {
    const [user] = await db.select().from(users).where(
      and(
        eq(users.passwordResetToken, token),
        gt(users.passwordResetExpires, new Date())
      )
    );
    
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }
    
    const hashedPassword = await this.hashPassword(newPassword);
    
    await db.update(users)
      .set({
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      })
      .where(eq(users.id, user.id));
    
    return user;
  },
  
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/verify-email?token=${token}`;
    
    await sendEmail({
      to: email,
      subject: 'Verify Your Email - Africa Mechanize',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Africa Mechanize</h1>
          </div>
          <div style="padding: 30px 20px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to Africa Mechanize!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Thank you for joining our mission to promote sustainable agricultural mechanization in Africa. 
              Please verify your email address to activate your account.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; 
                        border-radius: 6px; font-weight: 600; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 25px;">
              This verification link will expire in 24 hours. If you didn't create this account, 
              please ignore this email.
            </p>
          </div>
          <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            © 2025 Africa Mechanize. All rights reserved.
          </div>
        </div>
      `
    });
  },
  
  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/reset-password?token=${token}`;
    
    await sendEmail({
      to: email,
      subject: 'Reset Your Password - Africa Mechanize',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Africa Mechanize</h1>
          </div>
          <div style="padding: 30px 20px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              We received a request to reset your password. Click the button below to set a new password.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; 
                        border-radius: 6px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 25px;">
              This reset link will expire in 1 hour. If you didn't request this, please ignore this email.
            </p>
          </div>
          <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            © 2025 Africa Mechanize. All rights reserved.
          </div>
        </div>
      `
    });
  }
};

// Middleware functions
export const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

export const requireEmailVerification = (req, res, next) => {
  if (!req.user?.isEmailVerified) {
    return res.status(403).json({ message: 'Email verification required' });
  }
  next();
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

export const requireAdmin = requireRole('admin');

export default passport;