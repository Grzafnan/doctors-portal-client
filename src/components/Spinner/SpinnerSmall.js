import React from 'react';
import { Oval } from 'react-loader-spinner'

const SpinnerSmall = () => {
  return (
    <div className='flex justify-center mt-10'>
      <Oval
        height={40}
        width={40}
        color="#11E5FF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#11E5FF"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  );
};

export default SpinnerSmall;