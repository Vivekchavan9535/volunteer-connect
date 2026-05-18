import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";



const Signup = ({ setToken, setRole }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  
  const navigate = useNavigate();

  async function formSubmit(e) {

    e.preventDefault();

    // Empty validation
    if (!email || !password) {
      setMessage("All fields are required");
      setMessageType("error");

      return;
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Invalid email");
      setMessageType("error");

      return;
    }

    // Password validation
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");

      return;
    }

    try {
      setMessage("");
      setMessageType("");

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        {
          email,
          password,
        }
      );

      const data = response.data;

      setToken(data.token);

      setRole(data.user.role);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      if (data.user.role === "admin") {

        navigate("/dashboard");

      } else {

        navigate("/personal-info");
      }

    } catch (error) {

      
      console.log(error.response.data);

      setMessage("Signup Failed");
      setMessageType("error");
    }
  }

  return (
    <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 md:grid-cols-2">

      {/* Left Side Image */}

      <div className="relative hidden md:block h-[calc(100vh-72px)]">

        <img
          src="https://i1-c.pinimg.com/1200x/99/31/9a/99319a9125784abb36b090a38a83105b.jpg"
          alt="Volunteer"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text */}

        <div className="absolute top-16 left-10 right-10 text-white z-10">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Be the Reason They Rise
          </h1>

          <p className="text-2xl leading-10 text-gray-200">
            Every child carries a future worth believing
            in. Step in, share your time, and help turn
            learning into confidence, courage, and change.
          </p>

        </div>

      </div>

      {/* Right Side Signup */}

      <div className="bg-gray-100 flex items-center justify-center px-6">

        <div className="bg-white w-full max-w-lg p-12 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Signup to continue
        </p>

        {message && (
          <p
            className={`mb-6 rounded-lg px-4 py-3 text-center font-medium ${
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
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-200"
          >
            Signup
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

      </div>

    </div>
  );
};

export default Signup;
