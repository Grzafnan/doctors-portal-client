import React from 'react';
import doctor from '../../../assets/images/doctor-small.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../Utilities/PrimaryButton';

const MakeAppoinment = () => {
  return (
    <section style={{
      backgroundImage: `url(${appointment} )`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
      className=""
    >
      <div className="hero">
        <div className="hero-content relative md:p-10 lg:p-0 flex-col lg:flex-row">
          <img src={doctor} alt="" className="hidden lg:block lg:-mt-32 md:w-2/4" />
          <div className='md:w-2/4 text-white'>
            <h3 className='text-xl text-secondary font-bold pb-5'>Appointment</h3>
            <h2 className=" text-4xl font-semibold">Make an appointment Today</h2>
            <p className='py-5'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page.</p>
            <PrimaryButton>GET STARTED</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppoinment;