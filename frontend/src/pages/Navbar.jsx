import React from "react";
import "../assets/stylesheets/Home.css";

function Navbar({ user, buttons }) {
	return (
		<nav>
			<div className="username">{user}</div>
			<div className='navbar-links-container'>
				{/* <a href='/login'>Home</a> */}
				<a href=''>About</a>
				<a href=''>Contact</a>
				<button className='primary-button'>{buttons}</button>
			</div>
		</nav>
	);
}

export default Navbar;