import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';

// POST /api/auth/login
export const POST = async (request) => {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User Doesn't Exist" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid Credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sign in the user to establish the session
    await signIn('credentials', {
      email: user.email,
    });

    // Return success response
    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
