import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import SpinnerSmall from '../../Spinner/SpinnerSmall';
import AppointmentOptions from './AppoinmentOptions';
import BookingModal from './BookingModal';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const AvailableAppointment = ({ selectedDate }) => {
  const { user } = useContext(AuthContext);
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, 'PP')

  const { data: appointmentOptions, isLoading, refetch } = useQuery({
    queryKey: ['appointment-options', date],
    queryFn: () => axios.get(`https://doctors-portal-server-beige.vercel.app/v2/appointment-options?date=${date}`)
      .then(res => {
        const data = res?.data?.data
        return data;
      })
  })


  if (isLoading) {
    return <SpinnerSmall />
  }

  // console.log(appointmentOptions);


  return (
    <div className='mt-4'>
      <h3 className='text-xl text-secondary font-semibold text-center px-6'>Available Appointments on {format(selectedDate, 'PP')}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6 mb-10 md:mt-24 md:mb-32'>
        {
          appointmentOptions?.map(option => <AppointmentOptions
            key={option._id}
            option={option}
            setTreatment={setTreatment}
          />)
        }
      </div>

      {
        treatment && <BookingModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
          refetch={refetch}
        />
      }

    </div >
  );
};

export default AvailableAppointment;