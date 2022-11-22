import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Headers from '../components/Shared/Headers';
import { HiMenuAlt1 } from "react-icons/hi";
import { AuthContext } from '../contexts/AuthProvider';
import { VerifyAdmin } from '../components/api/verifyAdmin';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [isAdmin] = VerifyAdmin(user?.email);

  // console.log(isAdmin);


  return (
    <div className='min-h-screen'>
      <Headers />
      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="dashboard-drawer" className="drawer-button lg:hidden ">
            <HiMenuAlt1 className='h-5 w-5 cursor-pointer ml-5 inline-block' />
          </label>
          {/* Outlet */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-accent">
            <li className='text-base font-semibold'>
              <Link to='/dashboard/my-appointments'>My Appointments</Link>
            </li>
            {
              isAdmin && <>
                <li className='text-base font-semibold'>
                  <Link to='/dashboard/all-users'>All Users</Link>
                </li>
                <li className='text-base font-semibold'>
                  <Link to='/dashboard/add-doctor'>Add Doctor</Link>
                </li>
                <li className='text-base font-semibold'>
                  <Link to='/dashboard/manage-doctors'>Manage Doctors</Link>
                </li>
                <li className='text-base font-semibold'>
                  <Link to='/dashboard/manage-doctors'>Home</Link>
                </li>
              </>
            }
          </ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;