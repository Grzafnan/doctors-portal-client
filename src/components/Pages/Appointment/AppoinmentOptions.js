import React from 'react';

const AppointmentOptions = ({ option, setTreatment }) => {
  const { name, price, slots } = option;

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className=''>
        <div className="card shadow ">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-secondary">{name}</h2>
            <p className='text-md'>{slots?.length > 0 ? slots[0] : 'Try another day'}</p>
            <p className='text-md'>{slots?.length} {slots?.length > 1 ? "Spaces" : "Space"} Available</p>
            <p className='text-base font-semibold'>Fee: ${price}</p>
            <div className="card-actions">
              <label
                disabled={slots.length === 0}
                htmlFor="booking-modal"
                className="btn rounded text-md font-semibold btn-secondary uppercase text-white cursor-pointer"
                onClick={() => setTreatment(option)}
              >
                Book Appointment</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentOptions;