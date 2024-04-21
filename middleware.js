export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/products/add',
    '/profile',
    '/products/saved',
    '/messages',
    '/dashboard',
  ],
};
