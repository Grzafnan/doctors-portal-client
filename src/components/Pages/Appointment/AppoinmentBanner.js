import chair from '../../../assets/images/chair.png'
import bgImage from '../../../assets/images/bg.png'
import { DayPicker } from 'react-day-picker';


const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

  return (
    <header>
      <div className="px-6 md:px-10 flex md:py-24 flex-col-reverse md:flex-row items-center"
        style={{
          backgroundImage: `url(${bgImage} )`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className=" md:w-1/2 flex md:flex-col  mt-8 md:mt-0 items-center text-center"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(data => {
              if (data) {
                setSelectedDate(data)
              }
            })}
          />
        </div>
        <div className=" md:w-1/2 md:px-0">
          <img alt="dentist chair" src={chair} />
        </div>
      </div>
      <p></p>
    </header>
  );
};

export default AppointmentBanner;