import connectDB from '@/config/database';
import User from '@/models/User';
import Product from '@/models/Product';
import Cart from '@/models/Cart';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/cart
export const GET = async (req, res) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Fetch user's cart from the database
    const cart = await fetchUserCart(userId);

    if (!cart) {
      return new Response('Cart not found', { status: 404 });
    }

    return new Response(JSON.stringify(cart), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

// POST /api/cart
export const POST = async (req, res) => {
  try {
    await connectDB();

    const { productId, quantity, itemId } = await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID Is Required', { status: 401 });
    }

    const { userId } = sessionUser;

    const user = await User.findOne({ _id: userId });
    const product = await Product.findById(productId);
    const cart = await Cart.findById(itemId);

    await addToCart(user, product, quantity);

    return new Response('Item added to cart', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

// DELETE /api/cart
export const DELETE = async (req, res) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { userId } = sessionUser;

    const { itemId } = await req.json();

    await removeFromCart(userId, itemId);

    return new Response('Item removed from cart', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

// Example functions for handling cart operations
async function fetchUserCart(userId) {
  try {
    // Find the cart document associated with the user's userId
    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      cart = await createCartForUser(userId);
    }

    return cart;
  } catch (error) {
    throw new Error(`Failed to fetch user's cart: ${error.message}`);
  }
}

async function addToCart(userId, item, quantity = 1) {
  try {
    // Find the user based on userId
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Find the product based on itemId
    const product = await Product.findById(item._id);

    console.log(product);

    if (!product) {
      throw new Error('Product not found');
    }

    // Construct the order item
    const cartItem = {
      product: product._id,
      name: product.name,
      qty: quantity,
      images: product.images,
      price: product.price,
      productType: product.productType,
    };

    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      cart = new Cart({
        user: user._id,
        items: [cartItem],
      });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex((item) =>
      item.product.equals(product._id)
    );

    if (existingItemIndex !== -1) {
      // Increase quantity if the product is already in the cart
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      // Add the product to the cart if it's not already there
      cart.items.push(cartItem);
    }

    await cart.save();

    return; // No need to return anything if successful
  } catch (error) {
    throw new Error(`Failed to add item to cart: ${error.message}`);
  }
}

async function removeFromCart(userId, itemId) {
  try {
    // Find the cart associated with the user
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in the cart');
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();
  } catch (error) {
    throw new Error(`Failed to remove item from cart: ${error.message}`);
  }
}

async function createCartForUser(userId) {
  try {
    // Create a new cart document for the user
    const newCart = new Cart({ user: userId, items: [] });
    await newCart.save();
    return newCart;
  } catch (error) {
    throw new Error(`Failed to create cart for user: ${error.message}`);
  }
}
