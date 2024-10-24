import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Component to guard private routes based on authentication
const PrivateRoute = ({ element, adminRoute = false }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    // If it's an admin route and user is not an admin, redirect to home
    if (adminRoute && !isAdmin) {
        return <Navigate to="/home" />;
    }

    // If not authenticated, redirect to login
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
