import connectDB from '@/config/database';
import Product from '@/models/Product';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/products/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) return new Response('Product Not Found', { status: 404 });

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

// DELETE /api/products/:id
export const DELETE = async (request, { params }) => {
  try {
    const productId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const product = await Product.findById(productId);

    if (!product) return new Response('Product Not Found', { status: 404 });

    // Verify ownership
    if (product.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await product.deleteOne();

    return new Response('Property Successfully Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', {
      status: 500,
    });
  }
};

// PUT /api/products/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Get property to update
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return new Response('Product Does Not Exist', { status: 404 });
    }

    // Verify ownership
    if (existingProduct.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Create productData Object for database
    const productData = {
      category: formData.get('category'),
      type: formData.get('type'),
      name: formData.get('name'),
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      inStock: formData.get('inStock'),
      rating: formData.get('rating'),
      owner: userId,
    };

    // Update property in database
    const updatedProduct = await Product.findByIdAndUpdate(id, productData);

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed To Add Property', { status: 500 });
  }
};
