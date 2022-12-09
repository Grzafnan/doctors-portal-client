import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Headers = () => {
  const { logOut, user } = useContext(AuthContext);

  const menuItems = <React.Fragment>
    <li className=' py-1 px-4 lg:px-0'><Link to="/" className='font-semibold'>Home</Link></li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'><Link to="/appointment" className='font-semibold'>Appointment</Link></li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'><Link to="/dashboard" className='font-semibold'>Dashboard</Link></li>
    <li className='lg:mx-1 py-1 px-4 lg:px-0'><Link to="/reviews" className='font-semibold'>Reviews</Link></li>
    <li className=' py-1 px-4 lg:px-0'><Link to="/about" className='font-semibold'>About</Link></li>
    {
      user && user?.uid ? <>
        <li className=' px-4 lg:px-0'>
          <button
            onClick={logOut}
            className='font-semibold'
          >
            Log out
          </button>
        </li>
      </>
        :
        <>
          <li className=' py-1 px-4 lg:px-0'><Link to="/login" className='font-semibold'>Log in</Link></li>
        </>
    }
  </React.Fragment>


  return (
    <>
      <div className="navbar bg-base-100 flex md:flex-col-reverse lg:flex-row justify-between">
        <div className="w-full navbar-start lg:navbar-end flex-row-reverse justify-between lg:justify-start lg:flex-row">
          <div className="dropdown ">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content top-10 right-6 md:right-10 mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52 z-50">
              {menuItems}
            </ul>
          </div>
          <div className='lg:mr-auto'>
            <Link to="/" className="btn btn-ghost normal-case text-xl ">Doctors Portal</Link>
          </div>

        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>

      </div>
    </>
  );
};

export default Headers;