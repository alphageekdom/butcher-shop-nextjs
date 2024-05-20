![EliteCuts Logo](/public/elitecuts.jpeg)

# EliteCuts

EliteCuts is a web application designed to provide high quality cuts of meat, poultry, and pork for registered users only. With the option to order online and pickup at the butcher shop.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

![Features Image](/public/products.jpeg)

## Features

- User Authentication and Authorization
- Profile Management
- Bookmarking Products
- Purchasing Products
- Only Authenticated User Can Shop
- Admin Dashboard for Managing Products and Users
- Responsive Design

## Technologies Used

### Frontend

- Next.js
- Tailwind CSS
- React
- React Icons
- React Toastify
- React Share
- React Spinners
- React Photoswipe Gallery
- Photoswipe

### Backend

- Next.js API Routes
- Next-Auth
- Mongoose
- Cloudinary
- Express Validator
- Bcryptjs
- Stripe (React-Stripe-JS, Stripe-JS)
- Dompurify

### Database

- MongoDB

![Endpoints Image](/public/cart.jpeg)

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `DELETE /api/users` - Delete a user
- `POST /api/users` - Create a new user
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/:userId` - Update user by ID

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product by ID
- `DELETE /api/products/:id` - Delete product by ID
- `PUT /api/products/:id` - Update product by ID

### Properties

- `GET /api/product/featured` - Get featured products

### Admin

- `GET /api/admin` - Admin dashboard

### Cart

- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove item from cart

### Bookmarks

- `GET /api/bookmarks` - Get all bookmarks
- `POST /api/bookmarks` - Add a bookmark
- `POST /api/bookmarks/check` - Check a bookmark

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in an existing user

### Deployment

- Vercel

### Development Tools

- ESLint
- PostCSS
- Autoprefixer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
