import React, { useState } from 'react';
import AppointmentBanner from '../AppoinmentBanner';
import AvailableAppointment from '../AvailableAppointment';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <>
      <AppointmentBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <AvailableAppointment
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Appointment;