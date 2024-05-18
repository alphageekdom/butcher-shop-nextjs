import ProductCard from './product/ProductCard';

const SavedProducts = ({ bookmarks }) => {
  if (!bookmarks || bookmarks.length === 0) {
    return <p>No cuts found.</p>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {bookmarks.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default SavedProducts;
