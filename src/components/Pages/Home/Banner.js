import React from 'react';
import image from '../../../assets/images/chair.png'
import bgImage from '../../../assets/images/bg.png'
import PrimaryButton from '../../Utilities/PrimaryButton';

const Banner = () => {
  return (
    <>
      <section className="text-gray-600 body-font"
      >
        <div className="container mx-auto flex md:py-24 md:flex-row flex-col-reverse items-center"
          style={{
            backgroundImage: `url(${bgImage} )`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
          >
            <h1 className="title-font sm:text-4xl text-5xl font-bold mb-3 text-gray-900">Your New Smile Starts
              <br className="hidden lg:inline-block" />
              <span> Here</span>
            </h1>
            <p className="mb-8 leading-relaxed">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              <br className="hidden lg:inline-block" /> Ipsum has been the industry's standard dummy text ever since the</p>
            <div className="flex justify-center">
              <PrimaryButton>GET STARTED</PrimaryButton>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img className="object-cover object-center" alt="hero" src={image} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;