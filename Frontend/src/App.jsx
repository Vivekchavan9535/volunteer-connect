import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { API_BASE_URL } from "./config/api";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PersonalInfo from "./pages/PersonalInfo";
import VolunteerDetails from "./pages/VolunteerDetails";
import Dashboard from "./pages/Dashboard";

function App() {

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [role, setRole] = useState(
    () => localStorage.getItem("role") || ""
  );

  const [volunteers, setVolunteers] =
    useState([]);

  const [totalVolunteers, setTotalVolunteers] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState({
      totalFilteredVolunteers: 0,
      currentPage: 1,
      totalPages: 1,
      pageLimit: 8,
    });

  // Search Input
  const [location, setLocation] =
    useState("");

  // Debounced Search
  const [debouncedLocation,
    setDebouncedLocation] =
    useState("");

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocation(location);
      setPage(1);

    }, 500);

    return () => clearTimeout(timer);

  }, [location]);



  async function fetchVolunteers() {

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // Split search values
      const values = debouncedLocation.split(",");

      const locationValue = values[0]?.trim() || "";

      const languageValue = values[1]?.trim() || "";

      const availabilityValue = values[2]?.trim() || "";

      const response = await axios.get(
        `${API_BASE_URL}/api/volunteers?location=${locationValue}&language=${languageValue}&availability=${availabilityValue}&page=${page}&limit=${pagination.pageLimit}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setVolunteers(
        response.data.volunteers
      );

      setTotalVolunteers(
        response.data.totalVolunteers
      );

      setPagination({
        totalFilteredVolunteers:
          response.data.totalFilteredVolunteers,
        currentPage:
          response.data.currentPage,
        totalPages:
          response.data.totalPages || 1,
        pageLimit:
          response.data.pageLimit,
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    if (
      token &&
      role === "admin"
    ) {
      fetchVolunteers();
    }

  }, [debouncedLocation, page, token, role]);



  return (
    <BrowserRouter>

      <Navbar
        token={token}
        role={role}
        setToken={setToken}
        setRole={setRole}
      />

      <Routes>

        <Route
          path="/"
          element={
            token && role === "admin" ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : token &&
              role === "volunteer" ? (
              <Navigate
                to="/personal-info"
                replace
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            token && role === "admin" ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : token &&
              role === "volunteer" ? (
              <Navigate
                to="/personal-info"
                replace
              />
            ) : (
              <Login
                setToken={setToken}
                setRole={setRole}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              setToken={setToken}
              setRole={setRole}
            />
          }
        />

        <Route
          path="/personal-info"
          element={
            token &&
            role === "volunteer" ? (
              <PersonalInfo />
            ) : token &&
              role === "admin" ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/volunteer-details"
          element={
            token &&
            role === "volunteer" ? (
              <VolunteerDetails />
            ) : token &&
              role === "admin" ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            token &&
            role === "admin" ? (
              <Dashboard
                volunteers={volunteers}
                totalVolunteers={totalVolunteers}
                pagination={pagination}
                page={page}
                setPage={setPage}
                loading={loading}
                location={location}
                setLocation={
                  setLocation
                }
              />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
