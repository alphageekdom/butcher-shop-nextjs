import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST /api/auth/register
export const POST = async (request) => {
  try {
    await connectDB();

    const userData = await request.json();

    // Input validation
    if (
      !userData ||
      !userData.username ||
      !userData.email ||
      !userData.password
    ) {
      throw new Error('Invalid input data.');
    }

    // Check if username is already taken
    const existingUsername = await User.findOne({
      username: userData.username,
    });
    if (existingUsername) {
      throw new Error('Username is already taken.');
    }

    // Check if email is already registered
    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
      throw new Error('Email is already registered.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user object
    const newUser = new User({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });

    await newUser.save();

    // return Response.redirect(`${process.env.NEXTAUTH_URL}/auth/login`);

    return new Response(
      JSON.stringify({ message: 'Registration Successful' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.log(error);

    let errorMessage = 'Failed to register user.';
    // Customize error message based on specific error types
    if (error.message.includes('Username')) {
      errorMessage = 'Username is already taken.';
    } else if (error.message.includes('Email')) {
      errorMessage = 'Email is already registered.';
    }

    return new Response(errorMessage, { status: 400 });
  }
};
