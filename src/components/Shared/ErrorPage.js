import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <div className=" h-screen flex justify-center items-center ">
        <div className="flex items-center justify-center py-12 w-full">
          <div className="bg-white rounded-md flex items-center justify-center mx-4 md:w-2/3 ">
            <div className="flex flex-col items-center py-16 ">
              <img className="px-4 hidden md:block" src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png" alt="" />
              <img className="md:hidden" src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png" alt="" />
              <h1 className="px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-gray-800">OOPS! </h1>
              <p className="px-4 text-lg font-semibold text-red-600 leading-none text-center">
                {error?.status}
              </p>
              <p className="px-4 py-4 text-base text-gray-600 leading-none text-center">
                {error?.statusText || error?.message}
              </p>
              <Link to='/home'>
                <button className="mx-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Go Back HomePage</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ErrorPage;