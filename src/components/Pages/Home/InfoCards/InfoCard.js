import React from 'react';

const InfoCard = ({ card }) => {
  const { title, image, bgClass, des } = card;
  return (
    <>
      <div className={`md:flex flex-col lg:flex-row items-center py-8 md:py-[52px] px-[25px] rounded-[14px] ${bgClass}`}>
        <img src={image} className='w-[86px] h-[86px] mx-auto lg:mx-0' alt="Marker" />
        <div className='lg:pl-[22px] mt-6 lg:mt-0 text-white'>
          <h3 className='text-xl font-bold pb-3'>{title}</h3>
          <p className='text-base'>{des}</p>
        </div>
      </div>
    </>
  );
};

export default InfoCard;