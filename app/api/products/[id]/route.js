import connectDB from '@/config/database';
import Product from '@/models/Product';
import Review from '@/models/Review';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/products/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const product = await Product.findById(id);

    if (!product) return new Response('Product Not Found', { status: 404 });

    const reviews = await Review.find({ product: id });

    const productWithReviews = { ...product.toJSON(), reviews };

    return new Response(JSON.stringify(productWithReviews), {
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

    // Get product to update
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

    // Update product in database
    const updatedProduct = await Product.findByIdAndUpdate(id, productData);

    if (formData.has('comment') && formData.has('rating')) {
      const newReview = {
        comment: formData.get('comment'),
        rating: parseInt(formData.get('rating')),
      };

      // Push the new review to the product's reviews array
      updatedProduct.reviews.push(newReview);

      // Save the updated product
      await updatedProduct.save();
    }

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed To Add Product', { status: 500 });
  }
};

// POST /api/products/:id
export const POST = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { userId } = await getSessionUser();
    const { id } = params;

    const bodyText = await request.text();

    const requestBody = JSON.parse(bodyText);

    const { rating, comment } = requestBody;

    if (!rating || !comment) {
      return new Response('Rating and comment are required', { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return new Response('Product not found', { status: 404 });
    }

    // Validate the rating
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
      return new Response('Invalid rating value', { status: 400 });
    }

    let newRating = parsedRating;

    if (product.rating) {
      // If there's a previous rating, calculate the new rating based on the existing rating and the new one
      newRating = (product.rating + parsedRating) / 2; // Simple average of the old and new ratings
    }

    newRating = Math.floor(newRating * 100) / 100;

    product.rating = newRating;

    await product.save();

    const review = new Review({
      user: userId,
      product: id,
      rating,
      comment,
    });

    await review.save();

    return new Response(JSON.stringify(product), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create review', { status: 500 });
  }
};
