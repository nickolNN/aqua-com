import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/stores/authSlice';
import { AuthLoader } from '@/components/AuthLoader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ redirectFrom: location.pathname }} replace />;
  }

  return (
    <>
      <AuthLoader />
      {children}
    </>
  );
}
