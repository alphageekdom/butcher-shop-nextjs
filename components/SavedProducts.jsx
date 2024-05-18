import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/config/database';
import User from '@/models/User';
import ProductCard from './product/ProductCard';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const SavedProducts = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const user = await User.findById(userId).populate('bookmarks').lean();

  const bookmarks = user?.bookmarks;

  const plainBookmarks = bookmarks.map((bookmark) =>
    convertToSerializeableObject(bookmark)
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {serializedBookmarks.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          // onBookmarkChange={handleBookmarkChange}
        />
      ))}
    </div>
  );
};

export default SavedProducts;
