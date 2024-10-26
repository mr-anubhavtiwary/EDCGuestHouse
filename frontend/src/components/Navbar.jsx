import { useNavigate } from "react-router-dom";
import "../assets/stylesheets/Home.css";
import Avatar from "@mui/material/Avatar";

function stringToColor(string, isAdmin) {
	if (!string) return "";
	if (isAdmin) return "#eb4545ed";
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

function stringAvatar(name, isAdmin) {
	return {
		sx: {
			bgcolor: stringToColor(name, isAdmin),
		},
		children: `${name.split(" ")[0][0]}`,
	};
}

function Navbar({ user, buttons }) {
	const navigate = useNavigate();
	const isAdmin = localStorage.getItem("isAdmin") === "true";

	const handleProfile = () => {
		setTimeout(function () {
			if (isAdmin === "true") {
				setTimeout(() => {
					navigate("/adminDashboard");
				}, 500);
			} else {
				setTimeout(() => {
					navigate("/userDashboard");
				}, 500);
			}
		}, 1000);
	};
	const nameColor = stringToColor(user, isAdmin);
	return (
		<nav>
			<div className='navbar-username'>
				{user && (
					<Avatar {...stringAvatar(user, isAdmin)} onClick={handleProfile} />
				)}
				<div style={{ color: `${isAdmin ? "#eb4545ed" : nameColor}` }}>
					{user}
				</div>
			</div>
			<div className='navbar-links-container'>
				{!isAdmin && (
					<div>
						<a href='/home' style={{ color: "#302f2fec" }}>
							Home
						</a>
						<a href='/aboutPage' style={{ color: "#302f2fec" }}>
							About
						</a>
						<a href='/contact' style={{ color: "#302f2fec" }}>
							Contact
						</a>
						<a href='/galleryPage' style={{ color: "#302f2fec" }}>
							Gallery
						</a>
						<a href='/diningMenu' style={{ color: "#302f2fec" }}>
							Dining Menu
						</a>
					</div>
				)}
				{buttons}
			</div>
		</nav>
	);
}

export default Navbar;
