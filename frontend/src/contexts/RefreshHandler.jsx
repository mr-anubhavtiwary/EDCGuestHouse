import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated, setIsAdmin }) {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const isAdmin = JSON.parse(localStorage.getItem("isAdmin")) === true;

		if (token) {
			setIsAuthenticated(true);
			setIsAdmin(isAdmin);

			// Role-based redirection with conditional check to prevent loops
			if (isAdmin && location.pathname !== "/adminDashboard") {
				navigate("/adminDashboard", { replace: true });
			} else if (!isAdmin && location.pathname === "/adminDashboard") {
				navigate("/userDashboard", { replace: true });
			}
		} else {
			setIsAuthenticated(false);
			setIsAdmin(false);
			if (
				location.pathname !== "/login" &&
				location.pathname !== "/signup"
			) {
				navigate("/home", { replace: true });
			}
		}
	}, [location.pathname, navigate, setIsAuthenticated, setIsAdmin]);

	return null;
}

export default RefreshHandler;
