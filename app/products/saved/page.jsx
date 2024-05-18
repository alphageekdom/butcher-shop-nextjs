import SavedProducts from '@/components/SavedProducts';
import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const SavedProductsPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const user = await User.findById(userId).populate('bookmarks').lean();

  const bookmarks = user?.bookmarks || [];

  const plainBookmarks = bookmarks.map((bookmark) =>
    convertToSerializeableObject(bookmark)
  );

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Cuts</h1>
        <SavedProducts initialBookmarks={plainBookmarks} />
      </div>
    </section>
  );
};
export default SavedProductsPage;
