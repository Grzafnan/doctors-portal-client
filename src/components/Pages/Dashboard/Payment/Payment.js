import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../Spinner/Spinner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
  const { id } = useParams();

  const stripeKey = process.env.REACT_APP_STRIPE_KEY;
  const stripe = loadStripe(stripeKey);

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking'],
    queryFn: () => axios.get(`https://doctors-portal-server-beige.vercel.app/bookings/${id}`)
      .then(res => {
        if (res?.data?.success) {
          const data = res?.data?.data;
          return data;
        }
      })
      .catch(err => {
        console.log(err);
      })
  })

  // console.log(booking);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container mx-auto px-6 md:px-6 lg:px-10'>
      <h1 className='text-2xl font-bold pt-11'>Payment for {booking?.treatmentName}</h1>
      <p className='pb-7'>
        Please pay for your Appointment on {booking?.appointmentDate} at {booking?.appointmentTime}
      </p>
      <div className='w-96 mt-5 mb-10'>
        <Elements stripe={stripe}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;