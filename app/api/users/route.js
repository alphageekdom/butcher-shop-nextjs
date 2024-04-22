import connectDB from '@/config/database';
import User from '@/models/User';

// GET /api/users
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;

    const sortField = request.nextUrl.searchParams.get('sortField') || '_id';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') || 'asc';

    const skip = (page - 1) * pageSize;

    const sort = { [sortField]: sortOrder === 'desc' ? -1 : 1 };

    const total = await User.countDocuments({});
    const users = await User.find({}).sort(sort).skip(skip).limit(pageSize);

    const result = {
      total,
      users,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    await connectDB();

    const userId = request.nextUrl.searchParams.get('userId');

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response('User deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
