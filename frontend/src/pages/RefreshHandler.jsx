import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsAuthenticated(true);
			if (localStorage.getItem("isAdmin") === "true") {
				if (
					location.pathname === "/" ||
					location.pathname === "/login" ||
					location.pathname === "/signup" ||
					location.pathname === "/userDashboard" ||
					location.pathname === "/application"
				) {
					navigate("/adminDashboard", { replace: false });
				}
			} else {
				if (
					location.pathname === "/" ||
					location.pathname === "/login" ||
					location.pathname === "/signup" ||
					location.pathname === "/adminDashboard"
				) {
					navigate("/home", { replace: false });
				}
			}
		}
	}, [location, navigate, setIsAuthenticated]);
	return null;
}

export default RefreshHandler;
