import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/stylesheets/Login.css";
import { handleError, handleSuccess } from "../utils";
import { IoMdClose } from "react-icons/io";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControl, FormControlLabel, FormLabel } from "@mui/material";

function Login({ setPopup }) {
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});
	const [admin, setAdmin] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		const copyLoginInfo = { ...loginInfo };
		copyLoginInfo[name] = value;
		setLoginInfo(copyLoginInfo);
	};
	// console.log(LoginInfo);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = loginInfo;
		if (!email || !password) {
			return handleError("All fields are required");
		}
		try {
			const url = `${import.meta.env.VITE_HOST}/auth/${
				admin ? "adminLogin" : "login"
			}`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify(loginInfo),
			});
			const result = await response.json();
			const { success, message, jwtToken, name, email, error } = result;
			// console.log(email);
			if (success) {
				handleSuccess(message);
				localStorage.setItem("token", jwtToken);
				localStorage.setItem("loggedInUser", name);
				localStorage.setItem("loggedInUserEmail", email);
				localStorage.setItem("isAdmin", admin);

				setTimeout(() => {
					setPopup(null);
					if (!admin) {
						navigate("/home");
					} else {
						navigate("/adminDashboard");
					}
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
			<h1>Login</h1>
			<div className='container-heading' onClick={handlePopup}>
				<IoMdClose />
			</div>

			<form onSubmit={handleSubmit}>
				<FormControl>
					<FormLabel
						id='demo-row-radio-buttons-group-label'
						style={{}}
					>
						Role
					</FormLabel>
					<RadioGroup
						row
						defaultValue='user'
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='row-radio-buttons-group'
					>
						<FormControlLabel
							value='user'
							control={<Radio />}
							label='User'
							onChange={() => {
								setAdmin(false);
							}}
						/>
						<FormControlLabel
							value='admin'
							control={<Radio />}
							label='Admin'
							onChange={() => {
								setAdmin(true);
							}}
						/>
					</RadioGroup>
				</FormControl>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Enter your email...'
						value={loginInfo.email}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						onChange={handleChange}
						type='text'
						name='password'
						placeholder='Enter your password...'
						value={loginInfo.password}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}

export default Login;
