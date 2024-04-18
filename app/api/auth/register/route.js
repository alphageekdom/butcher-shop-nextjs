import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// POST /api/auth/register
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, username, password } = await request.json();

    // Check if email or username already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email already in use' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = new User({
      name,
      email,
      username,
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
