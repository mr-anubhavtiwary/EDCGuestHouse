import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
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
import GallaryPage from "./pages/GallaryPage";
import DiningMenu from "./pages/DiningMenu";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const PrivateRoutes = ({ element }) => {
		return isAuthenticated ? element : <Navigate to='/login' />;
	};
	return (
		<div className='App'>
			<RefreshHandler setIsAuthenticated={setIsAuthenticated} />
			<Routes>
				<Route path='/' element={<Navigate to='/home' />} />
				<Route
					path='/application'
					element={<PrivateRoutes element={<Application />} />}
				/>
				<Route path='/home' element={<Home />} />
				<Route path='/adminDashboard' element={<AdminDashboard />} />
				<Route path='/userDashboard' element={<UserDashboard />} />
				<Route path='/book' element={<Book />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/aboutPage' element={<AboutPage />} />
				<Route path='/gallaryPage' element={<GallaryPage />} />
				<Route path='/diningMenu' element={<DiningMenu />} />
				{/* 404 Route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
