import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      email: session.user.email,
      userId: session.user.userId,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
