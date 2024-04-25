import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const ProductImages = ({ images }) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        {images.length === 1 ? (
          <Item
            original={images[0]}
            thumbnail={images[0]}
            width={1000}
            height={600}
          >
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                src={images[0]}
                alt=''
                className='object-cover h-[400px] mx-auto rounded-xl'
                width={0}
                height={0}
                sizes='100vw'
                priority={true}
                placeholder='blur'
                blurDataURL={images[0]}
              />
            )}
          </Item>
        ) : (
          <div
            className={`grid ${
              images.length === 3 ? 'grid-cols-2' : 'grid-cols1'
            } gap-4`}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 0
                    ? 'col-span-2'
                    : 'col-span-1'
                }`}
              >
                <Item
                  original={image}
                  thumbnail={image}
                  width={1000}
                  height={600}
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={`/images/products/${image}`}
                      alt=''
                      className='object-cover h-[400px] w-full rounded-xl'
                      width={0}
                      height={0}
                      sizes='100vw'
                      priority={true}
                      placeholder='blur'
                      blurDataURL={`/images/products/${image}`}
                    />
                  )}
                </Item>
              </div>
            ))}
          </div>
        )}
      </section>
    </Gallery>
  );
};

export default ProductImages;