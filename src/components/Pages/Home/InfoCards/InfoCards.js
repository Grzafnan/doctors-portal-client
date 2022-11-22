import React from 'react';
import clock from '../../../../assets/icons/clock.svg';
import marker from '../../../../assets/icons/marker.svg';
import phone from '../../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {

  const infoCardsData = [
    {
      id: 1,
      title: 'Opening Hours',
      image: clock,
      bgClass: 'bg-gradient-to-r from-secondary to-primary',
      des: 'Opening Hours 9 a.m to 5 p.m every day',
    },
    {
      id: 2,
      title: 'Visit our location',
      image: marker,
      bgClass: 'bg-accent',
      des: 'Brooklyn, NY 10036, United States',
    },
    {
      id: 3,
      title: 'Contact us now',
      image: phone,
      bgClass: 'bg-gradient-to-r from-secondary to-primary',
      des: '+000 123 456789',
    },
  ]

  return (
    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        infoCardsData?.map(card => <InfoCard key={card.id} card={card} />)
      }

    </div>
  );
};

export default InfoCards;