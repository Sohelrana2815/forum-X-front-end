import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("location at private route:", location);

  if (loading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-600"></span>
    );
  }

  if (!user) {
    // Redirect to login page, preserving the location tried to access

    return <Navigate to="/login" state={{ form: location }} replace />;
  }

  return children; // Render the protected component
};

export default PrivateRoute;
