import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";

import "../assets/stylesheets/Application.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Application() {
	const navigate = useNavigate();
	const location = useLocation();
	const { loggedInUser, loggedInUserEmail } = location.state || {};
	const [termsAccepted, setTermsAccepted] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		designation: "A",
		employeeCode: "",
		applicantAddress: "",
		applicantPhone: "",
		guestName: "",
		guestAddress: "",
		guestMobile: "",
		guestEmail: "",
		relationWithApplicant: "A",
		rentPaidBy: "Applicant",
		checkInDate: "",
		checkOutDate: "",
		numberOfRooms: "",
		purposeOfStay: "Personal",
		accompanyingPersons: [{ name: "", relation: "" }],
	});

	useEffect(() => {
		setFormData((prevData) => ({
			...prevData,
			name: loggedInUser || prevData.name,
			email: loggedInUserEmail || prevData.email,
		}));
	}, [loggedInUser, loggedInUserEmail]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleAddPerson = () => {
		if (formData.accompanyingPersons.length >= 3) {
			handleError("You can add a maximum of 3 accompanying persons.");
			return;
		}
		setFormData({
			...formData,
			accompanyingPersons: [
				...formData.accompanyingPersons,
				{ name: "", relation: "" },
			],
		});
	};

	const handleCheckboxChange = (e) => {
		setTermsAccepted(e.target.checked);
	};

	const handlePersonChange = (index, e) => {
		const updatedPersons = formData.accompanyingPersons.map((person, i) =>
			i === index
				? { ...person, [e.target.name]: e.target.value }
				: person
		);
		setFormData({ ...formData, accompanyingPersons: updatedPersons });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// const { employeeCode, purpose } = formData;

		if (!termsAccepted) {
			return handleError("T&C must be Agreed");
		}

		try {
			const url = `${import.meta.env.VITE_HOST}/auth/application`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData, // Include existing form data (employeeCode, purpose)
					email: loggedInUserEmail, // Add loggedInUserEmail to the data sent
				}),
			});

			const result = await response.json();
			const { success, message, error } = result;
			if (success) {
				handleSuccess(message);
				setTimeout(() => {
					navigate("/home");
				}, 500);
			} else {
				handleError(message || error.details[0].message);
			}
		} catch (err) {
			handleError(err.message);
		}
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("loggedInUser");
		localStorage.removeItem("loggedInUserEmail");
		// setLoggedInUser(false);
		handleSuccess("Admin logged out");
		setTimeout(() => {
			navigate("/home");
		}, 500);
	};
	let buttons = (
		<button className='primary-button' onClick={handleLogout}>
			Logout
		</button>
	);
	return (
		<div className='application-container'>
			<Navbar user={loggedInUser} buttons={buttons} />
			<form className='application-form' onSubmit={handleSubmit}>
				<h2>Room Allotment Application</h2>

				<div>
					<label>Applicant Name</label>
					<input
						readOnly
						disabled
						type='text'
						name='applicantName'
						value={loggedInUser}
					/>
				</div>

				<div>
					<label>Designation</label>
					<select
						name='designation'
						value={formData.designation}
						onChange={handleChange}
					>
						<option value='A'>Director</option>
						<option value='B'>Head/Section in charge</option>
						<option value='C'>Faculty/staff</option>
						<option value='D'>Students</option>
					</select>
				</div>

				<div className='form-row'>
					<div className='form-column'>
						<label>Employee Code</label>
						<input
							type='text'
							name='employeeCode'
							value={formData.employeeCode}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-column'>
						<label>Phone Number</label>
						<input
							type='text'
							name='applicantPhone'
							value={formData.applicantPhone}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div>
					<label>Applicant Address</label>
					<input
						type='text'
						name='applicantAddress'
						value={formData.applicantAddress}
						onChange={handleChange}
						required
					/>
				</div>

				<h3>Guest Details</h3>
				<div>
					<label>Guest Name</label>
					<input
						type='text'
						name='guestName'
						value={formData.guestName}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Guest Address</label>
					<input
						type='text'
						name='guestAddress'
						value={formData.guestAddress}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='form-row'>
					<div className='form-column'>
						<label>Guest Mobile Number</label>
						<input
							type='text'
							name='guestMobile'
							value={formData.guestMobile}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-column'>
						<label>Guest Email</label>
						<input
							type='email'
							name='guestEmail'
							value={formData.guestEmail}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div>
					<label>Relation with Applicant</label>
					<select
						name='relationWithApplicant'
						value={formData.relationWithApplicant}
						onChange={handleChange}
					>
						<option value='A'>Institute Guest</option>
						<option value='B'>Departmental Guest</option>
						<option value='C'>
							Close Relatives of Faculty/Staff
						</option>
						<option value='D'>Other</option>
					</select>
				</div>
				<div className='accompanying-persons'>
					<h3>Accompanying Persons</h3>
					{formData.accompanyingPersons.map((person, index) => (
						<div key={index}>
							<label>Person {index + 1} Name</label>
							<input
								type='text'
								name='name'
								value={person.name}
								onChange={(e) => handlePersonChange(index, e)}
							/>

							<label>Relation</label>
							<input
								type='text'
								name='relation'
								value={person.relation}
								onChange={(e) => handlePersonChange(index, e)}
							/>
						</div>
					))}
					<button type='button' onClick={handleAddPerson}>
						Add Another Person
					</button>
				</div>
				<div>
					<label>Rent Paid By</label>
					<select
						name='rentPaidBy'
						value={formData.rentPaidBy}
						onChange={handleChange}
					>
						<option value='Applicant'>Applicant</option>
						<option value='Guest'>Guest</option>
					</select>
				</div>

				<h3>Booking Details</h3>
				<div>
					<label>Check-in Date</label>
					<input
						type='date'
						name='checkInDate'
						value={formData.checkInDate}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Check-out Date</label>
					<input
						type='date'
						name='checkOutDate'
						value={formData.checkOutDate}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Number of Rooms Required</label>
					<input
						type='number'
						name='numberOfRooms'
						value={formData.numberOfRooms}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Purpose of Stay</label>
					<select
						name='purposeOfStay'
						value={formData.purposeOfStay}
						onChange={handleChange}
					>
						<option value='Personal'>Personal</option>
						<option value='Official'>Official</option>
					</select>
				</div>
				<div className='checkbox-container'>
					<input
						type='checkbox'
						id='termsCheckbox'
						checked={termsAccepted}
						onChange={handleCheckboxChange}
						required
					/>
					<label htmlFor='termsCheckbox'>
						I confirm that the information provided is accurate and
						I agree to the{" "}
						<a
							href='https://www.mnnit.ac.in/images/newstories/2022/edc/905-_Notice_for_Revised_Tariff__Food_Charges_of_EDC_10.08.2022.pdf'
							alt='terms and conditions'
							target='blank'
						>
							terms and conditions.
						</a>
					</label>
				</div>
				<button type='submit'>Submit</button>
			</form>
			<Footer />
		</div>
	);
}

export default Application;
