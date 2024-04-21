import connectDB from '@/config/database';
import Product from '@/models/Product';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/admin
export const GET = async (req, res) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.isAdmin) {
    try {
      await connectDB();

      const usersCount = await User.countDocuments({});
      const productsCount = await Product.countDocuments({});

      const total = { users: usersCount, products: productsCount };

      return new Response(JSON.stringify(total), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return new Response('Something Went Wrong', { status: 500 });
    }
  }
};