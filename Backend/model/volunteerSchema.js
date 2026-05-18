import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  languages: {
    type: [String],
    required: true,
  },

  availability: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;