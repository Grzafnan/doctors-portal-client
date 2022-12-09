import React from 'react';
import bgImage from '../../../assets/images/appointment.png'
import PrimaryButton from '../../Utilities/PrimaryButton';

const ContactUs = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage} )`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full flex items-center justify-center px-4 md:px-0 mt-14 md:mt-10 py-6 md:py-10">
        <form className="md:w-1/2 w-full bg-white shadow rounded py-10 lg:px-10 md:px-8 px-4">
          <span className='md:text-xl text-xl text-secondary font-bold text-center block'>Contact Us</span>
          <p className="md:text-3xl text-2xl font-bold leading-7 text-center text-gray-700 mb-8">Stay connected with us</p>
          <div className=" flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">Name</label>
            <input arial-label="Please input name" type="text" name="name" className="text-base leading-none text-accent p-3  mt-4 border rounded border-accent" placeholder="Enter name " required />
          </div>
          <div className=" flex flex-col mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">Email Address</label>
            <input arial-label="Email address" type="email" name="email" className="text-base leading-none text-accent p-3  mt-4 border rounded border-accent" placeholder="Enter email address" required />
          </div>
          <div>
            <div className="w-full flex flex-col mt-4">
              <label className="text-base font-semibold leading-none text-gray-800">Message</label>
              <textarea aria-label="leave a message" type="text" name="message" className="h-36 text-base leading-none text-accent p-3 mt-4 border rounded border-accent resize-none" placeholder='Write a message' required />
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-6">
            <PrimaryButton type="submit">SUBMIT</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;