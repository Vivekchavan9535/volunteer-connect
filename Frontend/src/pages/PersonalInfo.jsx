import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const PersonalInfo = ({ volunteerData }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Sync prop data into form when available
  useEffect(() => {
    if (volunteerData) {
      setFormData({
        name: volunteerData.name || "",
        email: volunteerData.email || "",
        contactNumber: volunteerData.contactNumber || "",
        dob: volunteerData.dob?.split("T")[0] || "",
      });
    }
  }, [volunteerData]);

  function handleChange(e) {

    if (e.target.name === "contactNumber") {

      const contactNumber = e.target.value.replace(/\D/g, "").slice(0, 10);

      setFormData({
        ...formData,
        contactNumber,
      });

      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function formSubmit(e) {

    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.contactNumber ||
      !formData.dob
    ) {
      setMessage("All fields are required");
      setMessageType("error");

      return;
    }

    setMessage("");
    setMessageType("");

    // Temporary storage between pages
    localStorage.setItem(
      "personalInfo",
      JSON.stringify(formData)
    );

    navigate("/volunteer-details");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-3xl mx-auto px-4 py-10">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Personal Information
          </h1>

          <p className="text-gray-500 mb-8">
            Fill in your basic details
          </p>

          {message && (
            <p
              className={`mb-6 rounded-lg px-4 py-3 font-medium ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          <form
            className="flex flex-col gap-6"
            onSubmit={formSubmit}
          >

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                name="contactNumber"
                placeholder="Enter your contact number"
                value={formData.contactNumber}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]{10}"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Save & Continue
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default PersonalInfo;
