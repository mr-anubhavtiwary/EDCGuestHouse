const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	applications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Application",
		},
	],
});

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;

