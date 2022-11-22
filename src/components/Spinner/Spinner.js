import React from 'react';
import { ThreeDots } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='min-h-screen flex justify-center mt-10'>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#11E5FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;