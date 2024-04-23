import connectDB from '@/config/database';
import Product from '@/models/Product';

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const products = await Product.find({
      isFeatured: true,
    });

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};
