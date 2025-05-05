import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { islogged, Loading } from "../features/auth/authSlice";
import { Audio } from 'react-loader-spinner';

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(islogged);
  const isLoading = useSelector(Loading);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Audio height="80" width="80" radius="9" color="black" ariaLabel="loading" />
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoutes;