import react, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../assets/stylesheets/Application.css";

function Application() {
	const navigate = useNavigate();
	const location = useLocation();
	const { loggedInUser, loggedInUserEmail } = location.state || {};

	const [formData, setFormData] = useState({
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleAddPerson = () => {
		setFormData({
			...formData,
			accompanyingPersons: [
				...formData.accompanyingPersons,
				{ name: "", relation: "" },
			],
		});
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

		// if (!employeeCode || !purpose) {
		// 	return handleError("All fields are required");
		// }

		try {
			const url = "http://localhost:8080/auth/application";
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
					// navigate("/home");
				}, 1000);
			} else {
				handleError(message || error.details[0].message);
			}
		} catch (err) {
			handleError(err.message);
		}
	};

	return (
		<div className='application-container'>
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

				<div>
					<label>Employee Code</label>
					<input
						type='text'
						name='employeeCode'
						value={formData.employeeCode}
						onChange={handleChange}
						required
					/>
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

				<div>
					<label>Phone Number</label>
					<input
						type='text'
						name='applicantPhone'
						value={formData.applicantPhone}
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

				<div>
					<label>Guest Mobile Number</label>
					<input
						type='text'
						name='guestMobile'
						value={formData.guestMobile}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label>Guest Email</label>
					<input
						type='email'
						name='guestEmail'
						value={formData.guestEmail}
						onChange={handleChange}
						required
					/>
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

				<button type='submit'>Submit</button>
			</form>
			<ToastContainer />
		</div>
	);
}

export default Application;
