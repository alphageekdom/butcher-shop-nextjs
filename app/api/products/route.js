import connectDB from '@/config/database';
import Product from '@/models/Product';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

await connectDB();

// GET /api/products
export const GET = async (request) => {
  try {
    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;

    const sortField = request.nextUrl.searchParams.get('sortField') || '_id';
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') || 'asc';

    const skip = (page - 1) * pageSize;

    const sort = { [sortField]: sortOrder === 'desc' ? -1 : 1 };

    const total = await Product.countDocuments({});

    const products = await Product.find({})
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    const result = {
      total,
      products,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

    formData.set('rating', '0');

    console.log(formData);
    // Access all values from amenities and images
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    // Create productData object for database
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

    // Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'elitecuts',
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the productData object
      productData.images = uploadedImages;
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/products/${newProduct._id}`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log(error);
    return new Response('Failed to add product', { status: 500 });
  }
};
