import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/stylesheets/Signup.css";
import { handleError, handleSuccess } from "../utils";
import { IoMdClose } from "react-icons/io";

function Signup({ setPopup }) {
	const [SignupInfo, setSignupInfo] = useState({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		const copySignupInfo = { ...SignupInfo };
		copySignupInfo[name] = value;
		setSignupInfo(copySignupInfo);
	};
	// console.log(SignupInfo);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, email, password } = SignupInfo;
		if (!name || !email || !password) {
			return handleError("All fields are required");
		}
		try {
			const url = `${import.meta.env.VITE_HOST}/auth/signup`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify(SignupInfo),
			});
			const result = await response.json();
			const { success, message, error } = result;
			if (success) {
				handleSuccess(message);
				setTimeout(() => {
					setPopup(null);
					navigate("/home");
				}, 500);
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
			<h1>SignUp</h1>
			<div className='container-heading' onClick={handlePopup}>
				<IoMdClose />
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name</label>
					<input
						onChange={handleChange}
						type='text'
						name='name'
						autoFocus
						placeholder='Enter your name...'
						value={SignupInfo.name}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Enter your email...'
						value={SignupInfo.email}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						onChange={handleChange}
						type='text'
						name='password'
						placeholder='Enter your password...'
						value={SignupInfo.password}
					/>
				</div>
				<button className='signup' type='submit'>
					Signup
				</button>
			</form>
		</div>
	);
}

export default Signup;
