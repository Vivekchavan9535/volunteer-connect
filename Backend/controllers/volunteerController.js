import Volunteer from "../model/volunteerSchema.js";

export const createVolunteer = async (req, res) => {
    try {
        const {
            name,
            email,
            contactNumber,
            dob,
            location,
            languages,
            availability,
        } = req.body;

        const volunteer = await Volunteer.findOneAndUpdate(
            {
                userId: req.user.id,
            },
            {
                userId: req.user.id,
                name,
                email,
                contactNumber,
                dob,
                location,
                languages,
                availability,
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json({
            message:
                "Volunteer Saved Successfully",
            volunteer,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
}

export const getVolunteers = async (req, res) => {

    try {
        const {
            location,
            language,
            availability,
            page = 1,
            limit = 8,
        } = req.query;

        const currentPage = Number(page) || 1;
        const pageLimit = Number(limit) || 8;

        const skip = (currentPage - 1) * pageLimit;

        const filter = {};

        if (
            location &&
            location.trim()
        ) {

            filter.location = {
                $regex: location,
                $options: "i",
            };
        }

        if (
            language &&
            language.trim()
        ) {

            filter.languages = {
                $regex: language,
                $options: "i",
            };
        }

        if (
            availability &&
            availability.trim()
        ) {

            filter.availability = {
                $regex: availability,
                $options: "i",
            };
        }

        const volunteers = await Volunteer.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit);

        const totalVolunteers = await Volunteer.countDocuments();
        const totalFilteredVolunteers =
            await Volunteer.countDocuments(filter);

        const totalPages = Math.ceil(
            totalFilteredVolunteers / pageLimit
        );

        res.status(200).json({
            volunteers,
            totalVolunteers,
            totalFilteredVolunteers,
            currentPage,
            totalPages,
            pageLimit,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};



export const getMyVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.findOne({
            userId: req.user.id,
        });

        res.status(200).json({
            message: "Volunteer Fetch Successfully",
            volunteer,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
