import connectDB from '@/config/database';
import User from '@/models/User';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        await connectDB();
        const { email, password } = credentials;

        // Return early if email or password is empty
        if (!email || !password) {
          throw new Error('Invalid credentials');
        }

        try {
          const user = await User.findOne({ email });

          // User not found
          if (!user) {
            throw new Error('User not found');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          // Invalid password
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          };

          return userData;
        } catch (error) {
          console.error('Error occurred during authentication:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  database: process.env.MONGODB_URI,
  callbacks: {
    // Modify the session object
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      if (user) {
        session.user.isAdmin = user.isAdmin;
      }
      return session;
    },

    async signIn({ user }) {
      // Connect to database
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: user.email });
      // User does not exist, add to database
      if (!userExists) {
        // Truncate username if too long
        const name = user.name.slice(0, 20);
        const username = user.username.slice(0, 20);

        await User.create({
          email: user.email,
          name,
          username,
          image: user.picture,
        });
      }
      // Return true to allow sign-in
      return true;
    },
  },
};
