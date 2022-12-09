import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import SpinnerSmall from '../../Spinner/SpinnerSmall';

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: () => axios.get(`https://doctors-portal-server-beige.vercel.app/bookings?email=${user?.email}`, {
      headers: {
        authorization: `Bearer, ${localStorage.getItem('AccessToken')}`
      }
    })
      .then(res => {
        const data = res.data.data;
        return data;
      })
  });

  if (isLoading) {
    return <SpinnerSmall />;
  }

  return (
    <div className='container mx-auto px-6 md:px-6 lg:px-10'>
      <div className='flex justify-between items-center'>
        <h3 className="text-2xl font-semibold text-center lg:text-start text-accent">
          My Appointments
        </h3>
        <button className='btn btn-accent btn-outline'>
          MAY 10, 2022
        </button>
      </div>

      <div className='mt-5 mb-10'>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>SERVICE</th>
                <th>DATE </th>
                <th>TIME </th>
                <th>Payment </th>
              </tr>
            </thead>
            <tbody>
              {
                bookings?.length > 0 ? (
                  <>
                    {
                      bookings?.map((booking, idx) => <tr
                        key={idx}
                      >
                        <th>{idx + 1}</th>
                        <td>{booking?.patientName}</td>
                        <td>{booking?.treatmentName}</td>
                        <td>{booking?.appointmentTime}</td>
                        <td>{booking?.appointmentDate}</td>
                        <td>
                          {
                            booking?.price && !booking?.paid && <Link
                              to={`/dashboard/payment/${booking?._id}`}
                            >
                              <button className='btn btn-primary btn-sm font-bold'>
                                Pay
                              </button>
                            </Link>
                          }
                          {
                            booking?.price && booking?.paid && <span className='text-white bg-green-700 px-3 py-[2px] rounded-md font-semibold'>Paid</span>
                          }

                        </td>
                      </tr>)
                    }
                  </>
                )
                  : (
                    <>
                      <tr>
                        <td></td>
                        <td></td>
                        <td className='text-red-600 font-semibold'>No Appointment</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;