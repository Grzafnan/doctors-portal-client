import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Pages/Login/Login";
import Home from "../components/Pages/Home/Home";
import ErrorPage from "../components/Shared/ErrorPage";
import Main from "../layout/Main";
import Appointment from "../components/Pages/Appointment/Appoinment/Appointment";
import SignUp from "../components/Pages/Login/SignUp";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import MyAppointment from "../components/Pages/Dashboard/MyAppointment";
import AllUsers from "../components/Pages/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute/AdminRoute";
import AddDoctor from "../components/Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../components/Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../components/Pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/appointment',
        element: <Appointment />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      {
        path: '',
        element: <MyAppointment />
      },
      {
        path: '/dashboard/my-appointments',
        element: <MyAppointment />
      },
      {
        path: '/dashboard/all-users',
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: '/dashboard/add-doctor',
        element: <AdminRoute><AddDoctor /></AdminRoute>
      },
      {
        path: '/dashboard/manage-doctors',
        element: <AdminRoute><ManageDoctors /></AdminRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <PrivateRoutes><Payment /></PrivateRoutes>
      },

    ]
  }
])