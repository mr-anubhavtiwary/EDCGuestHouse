// import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/stylesheets/Home.css";
import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}`,
	};
}

function Navbar({ user, buttons }) {
	const navigate = useNavigate();
	const handleProfile = () => {
		const isAdmin = localStorage.getItem("isAdmin");
		console.log("isAdmin", typeof isAdmin);
		setTimeout(function () {
			if (isAdmin === "true") {
				navigate("/adminDashboard");
				console.log("admin");
			} else {
				navigate("/userDashboard");
			}
		}, 1000);
	};

	return (
		<nav>
			<div className='navbar-username'>
				{user && (
					<Avatar {...stringAvatar(user)} onClick={handleProfile} />
				)}
				{user}
			</div>
			<div className='navbar-links-container'>
				<a href='/home'>Home</a>
				<a href=''>About</a>
				<a href=''>Contact</a>
				{buttons}
			</div>
		</nav>
	);
}

export default Navbar;
