import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import RefreshHandler from "./contexts/RefreshHandler";
import { useState } from "react";
import Application from "./pages/Application";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import DiningMenu from "./pages/DiningMenu";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);

	// Wrapper to restrict routes based on user authentication and role
	const PrivateRoutes = ({ element, adminOnly, userOnly }) => {
		if (!isAuthenticated) return <Navigate to="/login" />;
		if (adminOnly && !isAdmin) return <Navigate to="/" />;
		if (userOnly && isAdmin) return <Navigate to="/" />;
		return element;
	};

	return (
		<div className="App">
			<RefreshHandler setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/home" element={<Home />} />

				{/* User Routes */}
				<Route
					path="/application"
					element={<PrivateRoutes element={<Application />} userOnly  />}
				/>
				<Route
					path="/userDashboard"
					element={<PrivateRoutes element={<UserDashboard />} userOnly />}
				/>
				<Route
					path="/book"
					element={<PrivateRoutes element={<Book />} userOnly />}
				/>
				<Route
					path="/confirmation"
					element={<PrivateRoutes element={<ConfirmationPage />} userOnly  />}
				/>

				{/* Admin Routes */}
				<Route
					path="/adminDashboard"
					element={<PrivateRoutes element={<AdminDashboard />} adminOnly />}
				/>

				{/* Public Routes */}
				<Route path="/contact" element={<Contact />} />
				<Route path="/aboutPage" element={<AboutPage />} />
				<Route path="/galleryPage" element={<GalleryPage />} />
				<Route path="/diningMenu" element={<DiningMenu />} />

				{/* 404 Route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
