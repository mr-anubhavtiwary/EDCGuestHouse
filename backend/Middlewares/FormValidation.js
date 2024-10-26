const Joi = require("joi");

// Define the Joi schema
const applicationSchema = Joi.object({
	status: Joi.string().valid("approved", "pending", "rejected").messages({
		"any.only": "Status must be approved, pending or rejected",
	}),
	name: Joi.string().min(3).max(100).required().messages({
		"string.empty": "name is required.",
		"string.min": "name must be at least 3 characters long.",
	}),

	email: Joi.string().email().required(),

	designation: Joi.string().valid("A", "B", "C", "D").required().messages({
		"any.only": "Relation with applicant must be A, B, C, or D.",
	}),

	employeeCode: Joi.string().alphanum().min(3).max(10).required().messages({
		"string.empty": "Employee code is required.",
		"string.alphanum":
			"Employee code must contain only alphanumeric characters.",
	}),

	applicantAddress: Joi.string().min(10).max(200).required().messages({
		"string.empty": "Applicant address is required.",
		"string.min": "Applicant address must be at least 10 characters long.",
	}),

	applicantPhone: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			"string.empty": "Phone number is required.",
			"string.pattern.base": "Phone number must be exactly 10 digits.",
		}),

	guestName: Joi.string().min(3).max(100).required().messages({
		"string.empty": "Guest name is required.",
		"string.min": "Guest name must be at least 3 characters long.",
	}),

	guestAddress: Joi.string().min(10).max(200).required().messages({
		"string.empty": "Guest address is required.",
		"string.min": "Guest address must be at least 10 characters long.",
	}),

	guestMobile: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required()
		.messages({
			"string.empty": "Guest mobile number is required.",
			"string.pattern.base":
				"Guest mobile number must be exactly 10 digits.",
		}),

	guestEmail: Joi.string().email().required().messages({
		"string.empty": "Guest email is required.",
		"string.email": "Please provide a valid email address.",
	}),

	relationWithApplicant: Joi.string()
		.valid("A", "B", "C", "D")
		.required()
		.messages({
			"any.only": "Relation with applicant must be A, B, C, or D.",
		}),

	accompanyingPersons: Joi.array()
		.items(
			Joi.object({
				name: Joi.string().min(3).max(100).allow(""),
				relation: Joi.string().min(3).max(50).allow(""),
			})
		)
		.max(3)
		.messages({
			"array.max": "You can add a maximum of 3 accompanying persons.",
		}),

	rentPaidBy: Joi.string().valid("Applicant", "Guest").required().messages({
		"any.only": "Rent paid by must be either Applicant or Guest.",
	}),

	checkInDate: Joi.date().required().messages({
		"date.base": "Please provide a valid check-in date.",
		"any.required": "Check-in date is required.",
	}),

	checkOutDate: Joi.date()
		.greater(Joi.ref("checkInDate"))
		.required()
		.messages({
			"date.base": "Please provide a valid check-out date.",
			"any.required": "Check-out date is required.",
			"date.greater": "Check-out date must be after check-in date.",
		}),

	numberOfRooms: Joi.number().integer().min(1).required().messages({
		"number.base": "Number of rooms must be a number.",
		"number.min": "You must request at least 1 room.",
	}),

	purposeOfStay: Joi.string()
		.valid("Personal", "Official")
		.required()
		.messages({
			"any.only": "Purpose of stay must be either Personal or Official.",
		}),
});

// Validation example
const applicationValidation = (req, res, next) => {
	// console.log(req.body);
	const { error } = applicationSchema.validate(req.body, {
		abortEarly: false,
	});
	if (error) {
		// console.log(error);
		return res.status(400).json({
			message: "Validation Error",
			errors: error.details.map((err) => err.message),
		});
	}
	next(); // No errors, validation successful
};

module.exports = { applicationValidation };
