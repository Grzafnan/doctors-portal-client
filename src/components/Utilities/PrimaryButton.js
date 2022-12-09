import React from 'react';

const PrimaryButton = ({ children }) => {
  return (
    <button className="inline-flex text-white bg-gradient-to-r from-secondary to-primary py-3 px-4 focus:outline-none rounded text-sm hover:bg-bg-gradient-to-r hover:from-primary hover:to-secondary transition-all ease-in-out font-semibold">{children}</button>
  );
};

export default PrimaryButton;