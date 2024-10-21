import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import RefreshHandler from "./pages/RefreshHandler";
import { useState } from "react";
import Application from "./pages/Application";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

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
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route
					path='/application'
					element={<PrivateRoutes element={<Application />} />}
				/>
				<Route path='/home' element={<Home />} />
				<Route path='/adminDashboard' element={<AdminDashboard />} />
				<Route path='/userDashboard' element={<UserDashboard />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
