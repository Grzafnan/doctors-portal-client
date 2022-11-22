import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import TestimonialCards from './TestimonialCards';


const Testimonials = () => {

  const testimonialData = [
    {
      id: 1,
      name: "Winson Herry",
      image: people1,
      address: "California",
      about: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    },
    {
      id: 2,
      name: "Jane Austen",
      image: people2,
      address: "New York, NY",
      about: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    },
    {
      id: 3,
      name: "Emily Brontë",
      image: people3,
      address: " Heathcliff",
      about: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'
    }
  ]



  return (
    <section className='mt-24'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-xl text-secondary font-bold'>Testimonial</h3>
          <h1 className='  text-3xl md:text-4xl text-accent'>What Our Patients Says</h1>
        </div>
        <div>
          <img src={quote} className=" w-24 h-20 md:h-40 md:w-48" alt="quote-icon" />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 md:mt-40 '>
        {
          testimonialData?.map(testimonial => <TestimonialCards
            key={testimonial.id} testimonial={testimonial} />)
        }
      </div>
    </section>
  );
};

export default Testimonials;