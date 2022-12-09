import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import ServiceCard from './ServiceCard';
import treatment from '../../../assets/images/treatment.png';
import PrimaryButton from '../../Utilities/PrimaryButton';



const Services = () => {

  const serviceCardsData = [
    {
      id: 1,
      title: 'Fluoride Treatment',
      image: fluoride,
      des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
    },
    {
      id: 2,
      title: 'Cavity Filling',
      image: cavity,
      des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the ',
    },
    {
      id: 3,
      title: 'Teeth Whitening',
      image: whitening,
      des: 'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
    },
  ]



  return (
    <>
      <section className='mt-32  mb-10 lg:mb-32'>
        <div className='text-center'>
          <h3 className='text-xl font-bold text-secondary'>Our Services</h3>
          <h1 className='text-4xl text-accent'>Services We Provide</h1>
        </div>

        <div className='my-[35px] relative grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
          {
            serviceCardsData?.map(card => <ServiceCard key={card.id} card={card} />)
          }
        </div>

        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center text-accent">

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img className="object-cover object-center rounded" alt="hero" src={treatment} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center text-slate-600  hover:text-slate-900">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">Exceptional Dental Care, on Your Terms</h1>
            <p className="mb-8 leading-relaxed ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>

            <PrimaryButton>GET STARTED</PrimaryButton>
          </div>
        </div>

      </section>
    </>
  );
};

export default Services;