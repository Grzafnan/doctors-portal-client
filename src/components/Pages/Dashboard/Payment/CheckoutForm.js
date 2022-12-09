import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import SpinnerSmall from '../../../Spinner/SpinnerSmall';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ booking }) => {
  // console.log(booking);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [stripeClientSecret, setStripeClientSecret] = useState('')
  const navigate = useNavigate();
  // console.log(stripeClientSecret);
  const stripe = useStripe();
  const elements = useElements();

  const { _id, price, treatmentName, patientName, email } = booking;


  useEffect(() => {
    axios.post(`https://doctors-portal-server-beige.vercel.app/create-payment-intent`, {
      price,
      headers: {
        authorization: `Bearer ${localStorage.getItem('AccessToken')}`
      }
    })
      .then(res => {
        if (res?.data?.success) {
          setStripeClientSecret(res?.data?.clientSecret);
          // toast.success(`Payment successful for ${treatmentName}`)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [price, treatmentName])

  if (loading) {
    return <SpinnerSmall />
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message)
    } else {
      setError('')
    }


    setSuccess('');
    setProcessing(true);
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(stripeClientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: email
          },
        },
      },
    );


    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {

      const payment = {
        patientName,
        price,
        email,
        bookingId: _id,
        transactionId: paymentIntent?.id,
      }

      axios.post('https://doctors-portal-server-beige.vercel.app/payments', payment, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('AccessToken')}`
        }
      })
        .then(res => {
          // console.log(res.data.success);
          if (res?.data?.success) {
            toast.success('Payment successful')
            setSuccess('Congrats! your payment completed.')
            setTransactionId(paymentIntent?.id);
            // navigate('/dashboard/my-appointments')
          }
        })
        .catch(err => console.log(err))

    }
    setProcessing(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <p className='text-red-600'>{error}</p>
        <button
          className='btn btn-sm btn-primary mt-5'
          type="submit"
          disabled={!stripe || !stripeClientSecret || processing}
        >
          Pay
        </button>
      </form>
      {
        success && <div>
          <p className='text-green-600 font-medium'>{success}</p>
          <p className='font-semibold'>
            Your transactionID: <span className='font-bold'>{transactionId}</span>
          </p>
        </div>
      }

    </>
  );
};

export default CheckoutForm;