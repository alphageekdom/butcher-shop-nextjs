import connectDB from '@/config/database';
import Product from '@/models/Product';

// GET /api/products/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const product = searchParams.get('product');
    const productType = searchParams.get('productType');

    const productPattern = new RegExp(product, 'i');

    // Match product type against database fields
    let query = {
      $or: [
        { name: productPattern },
        { description: productPattern },
        { type: productPattern },
        { title: productPattern },
      ],
    };

    console.log(query);

    // Only check for product if it's not 'All'
    if (productType && productType !== 'All') {
      const typePattern = new RegExp(productType, 'i');
      query.type = typePattern;
    }

    const products = await Product.find(query);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};
