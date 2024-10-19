import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../assets/stylesheets/Login.css";
import { handleError, handleSuccess } from "../utils";
import { IoMdClose } from "react-icons/io";

function Login({ setPopup }) {
	const [LoginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		const copyLoginInfo = { ...LoginInfo };
		copyLoginInfo[name] = value;
		setLoginInfo(copyLoginInfo);
	};
	// console.log(LoginInfo);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = LoginInfo;
		if (!email || !password) {
			return handleError("All fields are required");
		}
		try {
			const url = "http://localhost:8080/auth/login";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify(LoginInfo),
			});
			const result = await response.json();
			const { success, message, jwtToken, name, email, error } = result;
			console.log(email);
			if (success) {
				handleSuccess(message);
				localStorage.setItem("token", jwtToken);
				localStorage.setItem("loggedInUser", name);
				localStorage.setItem("loggedInUserEmail", email);
				// console.log("loggedInUser");
				setTimeout(() => {
					setPopup(null);
					navigate("/home");
				}, 1000);
			} else {
				handleError(message || error.details[0].message);
			}
		} catch (err) {
			handleError(err);
		}
	};
	const handlePopup = () => {
		setPopup(null);
	};
	return (
		<div className='container'>
			<h1>Login</h1>
			<div className='container-heading' onClick={handlePopup}>
				<IoMdClose />
			</div>

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Enter your email...'
						value={LoginInfo.email}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						onChange={handleChange}
						type='text'
						name='password'
						placeholder='Enter your password...'
						value={LoginInfo.password}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
			<ToastContainer />
		</div>
	);
}

export default Login;
