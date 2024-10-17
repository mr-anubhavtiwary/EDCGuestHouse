import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "react-toastify/ReactToastify.css";
import RefreshHandler from "./pages/RefreshHandler";
import { useState } from "react";
import Application from "./pages/Application";

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
			</Routes>
		</div>
	);
}

export default App;
