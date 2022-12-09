import React from 'react';
import Banner from './Banner';
import ContactUs from './ContactUs';
import InfoCards from './InfoCards/InfoCards';
import MakeAppoinment from './MakeAppoinment';
import Services from './Services';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div className='px-5'>
      <Banner />
      <InfoCards />
      <Services />
      <MakeAppoinment />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;