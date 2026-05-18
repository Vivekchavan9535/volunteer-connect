import express from "express";

import {
  createVolunteer,
  getVolunteers,
  getMyVolunteer
} from "../controllers/volunteerController.js";

import userAuthentication from "../middleware/userAuthentication.js";
import userAuthorization from "../middleware/userAuthorization.js";

const router = express.Router();

router.post(
  "/",
  userAuthentication,
  createVolunteer
);

router.get(
  "/",
  userAuthentication,
  userAuthorization("admin"),
  getVolunteers
);


router.get(
  "/me",
  userAuthentication,
  getMyVolunteer
);

export default router;