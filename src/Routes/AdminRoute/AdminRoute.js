import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { VerifyAdmin } from '../../components/api/verifyAdmin';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = VerifyAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner />
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />

};

export default AdminRoute;