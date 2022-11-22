import React from 'react';

const ServiceCard = ({ card }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className='w-full h-[300px] '>
      <div className="card h-full bg-base-100 shadow hover:scale-105 transition-all hover:bg-gray-100">
        <figure className="pt-8">
          <img src={card?.image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{card?.title}</h2>
          <p className='text-gray-600 hover:text-slate-900'>{card?.des}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;