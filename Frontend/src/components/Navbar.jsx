import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({
  token,
  role,
  setToken,
  setRole,
}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("");
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex items-center justify-between">

      <h1 className="text-2xl font-bold text-blue-600">
        Volunteer Connect
      </h1>

      <div className="flex items-center gap-6">

        {!token && (
          <>
            <NavLink
              to="/login"
              className={navLinkStyle}
            >
              Login
            </NavLink>
          </>
        )}

        {token && role === "volunteer" && (
          <>
            <NavLink
              to="/personal-info"
              className={navLinkStyle}
            >
              Personal Info
            </NavLink>

            <NavLink
              to="/volunteer-details"
              className={navLinkStyle}
            >
              Volunteer Details
            </NavLink>
          </>
        )}

        {token && role === "admin" && (
          <NavLink
            to="/dashboard"
            className={navLinkStyle}
          >
            Dashboard
          </NavLink>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
