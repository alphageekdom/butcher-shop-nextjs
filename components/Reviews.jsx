import ReviewCard from './ReviewCard';
import JosephImage from '@/assets/images/joseph.jpg';
import SoniaImage from '@/assets/images/sonia.jpg';
import AlbertImage from '@/assets/images/albert.jpg';

const Reviews = () => {
  return (
    <section className='px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-2xl font-bold text-center mb-6'>
          Customer Reviews
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <ReviewCard
            name='Joseph Doe'
            date='May 1, 2022'
            review="Absolutely top-notch meat cuts! Every bite is a testament to the quality and expertise of EliteCuts. As a local in Southern California, I'm fortunate to have such a gem nearby."
            imageSrc={JosephImage}
            favoriteMeatCut='/products/6632a88bdfbba9d57372e8a8'
          />
          <ReviewCard
            name='Sonia Smith'
            date='April 28, 2020'
            review="EliteCuts' meat cuts are unparalleled. Each piece is tender, succulent, and elevates any meal to a gourmet experience. Living in Southern California, I can't imagine going anywhere else for my meat."
            imageSrc={SoniaImage}
            favoriteMeatCut='/products/6632a88bdfbba9d57372e8b3'
          />
          <ReviewCard
            name='Albert Johnson'
            date='April 25, 2024'
            review="I'm consistently amazed by the caliber of meat cuts from EliteCuts. Their commitment to excellence shines through in every bite! Being in Southern California, EliteCuts is my go-to for premium meats."
            imageSrc={AlbertImage}
            favoriteMeatCut='/products/6632a88bdfbba9d57372e8b4'
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
