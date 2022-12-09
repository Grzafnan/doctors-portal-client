import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingModal = ({
  treatment,
  setTreatment,
  selectedDate,
  refetch
}) => {
  // console.log(treatment);
  const { name, price, slots } = treatment; // treatment is appointment options
  const date = format(selectedDate, 'PP');
  const { user } = useContext(AuthContext);


  const handleBooking = e => {
    e.preventDefault();

    if (!user?.uid || !user?.email) {
      return toast.error('First Login to booking an Appointment!!');
    }

    const form = e.target;
    const slot = form.slot.value;
    const patientName = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;


    const booking = {
      treatmentName: name,
      appointmentDate: date,
      appointmentTime: slot,
      issueDate: new Date().toLocaleString(),
      patientName,
      price,
      email,
      phone,
    }

    axios.post('https://doctors-portal-server-beige.vercel.app/bookings', booking)
      .then(res => {
        if (res?.data?.data?.acknowledged) {
          toast.success(`Successfully added to booking with id ${res.data?.data?.insertedId}`)
          setTreatment(null);
          refetch();
        }
        else {
          toast.error(res?.data?.message);
          setTreatment(null);
        }
      })

  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5 mt-6'>
            <input type="text" className="input w-full bg-gray-200 focus:outline-none placeholder-text-accent placeholder-text-base" defaultValue={date} disabled />

            <select name='slot' className="select select-bordered w-full">
              {
                slots.map((slot, index) => <option
                  key={index}
                  value={slot}
                  required
                >
                  {slot}
                </option>
                )
              }
            </select>
            <input name='name' type="text" defaultValue={user?.displayName} placeholder="Full Name" className="input w-full border-1 border-gray-200" disabled />
            <input name='email' type="text" defaultValue={user?.email} placeholder="Email address" className="input w-full border-1 border-gray-200" disabled />
            <input name='phone' type="tel" placeholder="Phone" className="input w-full border-1 border-gray-200" required />
            <input className='w-full btn text-white ' type="submit" value="SUBMIT" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;