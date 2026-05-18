import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { API_BASE_URL } from "../config/api";



const Login = ({ setToken, setRole }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const navigate = useNavigate()


  async function loginWithCredentials(loginEmail, loginPassword) {

    // Empty validation
    if (!loginEmail || !loginPassword) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginEmail)) {
      setMessage("Invalid email");
      setMessageType("error");
      return;
    }

    // Password validation
    if (loginPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      return;
    }
    try {
      setMessage("");
      setMessageType("");

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const data = response.data;

      setToken(data.token)
      setRole(data.user.role)

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/personal-info");
      }

    } catch (error) {

      console.log(error);

      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.statusText ||
        error.message;

      setMessage(serverMessage);
      setMessageType("error");
    }
  }

  async function formSubmit(e) {
    e.preventDefault()

    loginWithCredentials(email, password);
  }

  function demoLogin(demoEmail, demoPassword) {
    setEmail(demoEmail);
    setPassword(demoPassword);
    loginWithCredentials(demoEmail, demoPassword);
  }


  return (
    <div className="min-h-[calc(100vh-72px)] grid grid-cols-1 md:grid-cols-2">



      {/* Left Side Image */}

      <div className="relative hidden md:block h-[calc(100vh-72px)]">

        <img
          src="https://i.pinimg.com/736x/05/ec/0b/05ec0bae54d2faa9d4498cd8f04b6c0f.jpg"
          alt="Volunteer"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text */}

        <div className="absolute bottom-16 left-10 right-10 text-white z-10">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            The Path of Opportunity
          </h1>

          <p className="text-2xl leading-10 text-gray-200">
            Join our mission to eliminate educational
            inequity in India. Your journey as a volunteer
            starts here, bringing hope and knowledge to
            those who need it most.
          </p>

        </div>

      </div>

      {/* Right Side Login */}

      <div className="bg-gray-100 flex items-center justify-center px-6">


        <div className="bg-white w-full max-w-lg p-12 rounded-2xl shadow-lg">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          {message && (
            <p
              className={`mb-6 rounded-lg px-4 py-3 text-center font-medium ${messageType === "success"
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
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all duration-200"
            >
              Login
            </button>

          </form>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() =>
                demoLogin(
                  "admin@test.com",
                  "admin123"
                )
              }
              className="rounded-lg border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50"
            >
              Demo Admin
            </button>

            <button
              type="button"
              onClick={() =>
                demoLogin(
                  "volunteer@test.com",
                  "volunteer123"
                )
              }
              className="rounded-lg border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50"
            >
              Demo Volunteer
            </button>

          </div>

          <p className="text-center text-gray-600 mt-6">

            Don't have an account?

            <Link
              to="/signup"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Signup
            </Link>

          </p>
          <br />
          <p className="text-red-500">This website is hosted on Render.com, so the server may take a few seconds to wake up if it has been idle</p>

        </div>



      </div>

    </div>
  );
};

export default Login;
