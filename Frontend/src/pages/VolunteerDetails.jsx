import { useEffect, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../config/api";

import { useNavigate } from "react-router-dom";

const VolunteerDetails = ({ volunteerData, setVolunteerData }) => {

    const navigate = useNavigate();

    const languagesList = [
        "English",
        "Hindi",
        "Kannada",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Marathi",
        "Gujarati",
        "Bengali",
        "Punjabi",
    ];

    const daysList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const [formData, setFormData] = useState({
        location: "",
        languages: [],
        availability: [],
    });

    const [initialData, setInitialData] = useState({
        location: "",
        languages: [],
        availability: [],
    });

    const [submitting, setSubmitting] = useState(false);

    const [suggestions, setSuggestions] = useState([]);

    const [locationSelected, setLocationSelected] =
        useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const [personalInfoChanged, setPersonalInfoChanged] = useState(false);

    async function handleLocation(e) {

        const value = e.target.value;

        setLocationSelected(false);

        setFormData({
            ...formData,
            location: value,
        });

        // minimum 3 letters
        if (value.length < 3) {

            setSuggestions([]);

            return;
        }

        try {

            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${value}&format=json&countrycodes=in&addressdetails=1&limit=5`
            );

            setSuggestions(response.data);

        } catch (error) {

            console.log(error);
        }
    }

    function selectLocation(place) {

        setFormData({
            ...formData,
            location: place.display_name,
        });

        setLocationSelected(true);

        setSuggestions([]);
    }

    // Sync prop data into form when available
    useEffect(() => {
        if (volunteerData) {
            const fetchedData = {
                location: volunteerData.location || "",
                languages: volunteerData.languages || [],
                availability: volunteerData.availability || [],
            };

            setFormData(fetchedData);
            setInitialData(fetchedData);

            if (volunteerData.location) {
                setLocationSelected(true);
            }

            // Check if personal info in localStorage differs from DB
            const storedPersonalInfo = JSON.parse(
                localStorage.getItem("personalInfo") || "{}"
            );
            const dbDob = volunteerData.dob?.split("T")[0] || "";
            if (
                storedPersonalInfo.name !== undefined &&
                (
                    storedPersonalInfo.name !== (volunteerData.name || "") ||
                    storedPersonalInfo.email !== (volunteerData.email || "") ||
                    storedPersonalInfo.contactNumber !== (volunteerData.contactNumber || "") ||
                    storedPersonalInfo.dob !== dbDob
                )
            ) {
                setPersonalInfoChanged(true);
            } else {
                setPersonalInfoChanged(false);
            }
        }
    }, [volunteerData]);

    function handleLanguage(language) {

        if (
            formData.languages.includes(language)
        ) {

            setFormData({
                ...formData,
                languages:
                    formData.languages.filter(
                        (item) => item !== language
                    ),
            });

        } else {

            setFormData({
                ...formData,
                languages: [
                    ...formData.languages,
                    language,
                ],
            });
        }
    }

    function handleAvailability(day) {

        if (
            formData.availability.includes(day)
        ) {

            setFormData({
                ...formData,
                availability:
                    formData.availability.filter(
                        (item) => item !== day
                    ),
            });

        } else {

            setFormData({
                ...formData,
                availability: [
                    ...formData.availability,
                    day,
                ],
            });
        }
    }

    const isUnchanged =
        !personalInfoChanged &&
        formData.location === initialData.location &&
        formData.languages.length === initialData.languages.length &&
        formData.languages.every((lang) => initialData.languages.includes(lang)) &&
        formData.availability.length === initialData.availability.length &&
        formData.availability.every((day) => initialData.availability.includes(day));

    async function formSubmit(e) {

        e.preventDefault();

        if (
            !formData.location ||
            formData.languages.length === 0 ||
            formData.availability.length === 0
        ) {

            setMessage("All fields are required");

            setMessageType("error");

            return;
        }

        if (!locationSelected) {

            setMessage(
                "Please select a valid location from suggestions"
            );

            setMessageType("error");

            return;
        }

        const personalInfo = JSON.parse(
            localStorage.getItem("personalInfo")
        );

        const finalData = {
            ...personalInfo,
            ...formData,
        };

        try {
            setSubmitting(true);
            setMessage("");
            setMessageType("");

            const token =
                localStorage.getItem("token");

            await axios.post(
                `${API_BASE_URL}/api/volunteers`,
                finalData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setMessage("Volunteer Registered");
            setMessageType("success");

            setInitialData({ ...formData });
            setPersonalInfoChanged(false);

            // Update App-level cache so re-navigating won't re-fetch
            const personalInfo = JSON.parse(
                localStorage.getItem("personalInfo") || "{}"
            );
            setVolunteerData((prev) => ({
                ...prev,
                ...personalInfo,
                ...formData,
            }));

        } catch (error) {

            console.log(error);

            setMessage("Submission Failed");

            setMessageType("error");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-7">

                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Volunteering Details
                </h1>

                <p className="text-gray-500 mb-8">
                    Share your volunteering preferences
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
                    className="flex flex-col gap-8"
                    onSubmit={formSubmit}
                >

                    {/* Location */}

                    <div className="relative">

                        <label className="block mb-3 font-semibold text-gray-800">
                            Preferred Teaching Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="Search city..."
                            value={formData.location}
                            onChange={handleLocation}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <p className="text-xs text-gray-400 mt-2">
                            Start typing at least 3 letters
                        </p>

                        {suggestions.length > 0 && (

                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-2 max-h-56 overflow-y-auto shadow-lg">

                                {suggestions.map((place) => (

                                    <div
                                        key={place.place_id}
                                        onClick={() =>
                                            selectLocation(place)
                                        }
                                        className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all"
                                    >

                                        {place.display_name}

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                    {/* Languages */}

                    <div>

                        <label className="block mb-4 font-semibold text-gray-800">
                            Languages Spoken
                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            {languagesList.map((language) => (

                                <div
                                    key={language}
                                    onClick={() =>
                                        handleLanguage(language)
                                    }
                                    className={`rounded-xl border px-4 py-3 flex items-center gap-3 cursor-pointer transition-all

                                    ${
                                        formData.languages.includes(
                                            language
                                        )
                                            ? "bg-blue-100 border-blue-500 text-blue-700"
                                            : "border-gray-300 hover:border-blue-400 bg-white"
                                    }`}
                                >

                                    <input
                                        type="checkbox"
                                        checked={formData.languages.includes(
                                            language
                                        )}
                                        readOnly
                                        className="h-4 w-4"
                                    />

                                    <span className="font-medium">
                                        {language}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Availability */}

                    <div>

                        <label className="block mb-2 font-semibold text-gray-800">
                            Weekly Availability
                        </label>

                        <p className="text-sm text-gray-500 mb-4">
                            Select the days you are available.
                        </p>

                        <div className="flex flex-wrap gap-3">

                            {daysList.map((day) => (

                                <button
                                    type="button"
                                    key={day}
                                    onClick={() =>
                                        handleAvailability(day)
                                    }
                                    className={`rounded-full px-5 py-2 border font-medium transition-all

                                    ${
                                        formData.availability.includes(
                                            day
                                        )
                                            ? "bg-blue-100 text-blue-700 border-blue-500"
                                            : "border-gray-300 bg-white hover:border-blue-400"
                                    }`}
                                >

                                    {day.slice(0, 3)}

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex items-center justify-between border-t pt-6">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/personal-info")
                            }
                            className="border border-gray-400 rounded-xl px-6 py-2 font-semibold hover:bg-gray-100"
                        >
                            Back
                        </button>

                        <button
                            type="submit"
                            disabled={isUnchanged || submitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-2 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
                        >
                            {submitting ? "Submitting..." : "Complete Registration"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default VolunteerDetails;