import express from "express";
import auth from "../config/auth.mjs";
import uploaded from "../config/upload.mjs";
import { isAdmin } from "../config/isAdmin.mjs";
import {
  forgotPassword,
  login,
  registration,
  resetPassword,
  update,
  uploadProfilePic,
} from "../controllers/users.mjs";
import {
  courses,
  deleteCourses,
  getAllCourses,
  updateCourses,
} from "../controllers/course.mjs";
import {
  enrollCourses,
  getAllTakenCourses,
} from "../controllers/enrollement.mjs";

const routes = express.Router();

//users routes
routes.route("/user/registration").post(registration); //for registration
routes.route("/user/login").post(login); //for login
routes.route("/user/update").post(auth, update); //for update
routes.route("/user/forgot-password").post(forgotPassword); //forgot password
routes.route("/user/:id/:token").post(resetPassword); //reset password
routes
  .route("/user/update-profile-pic")
  .post(uploaded.single("name"), auth, uploadProfilePic); //upload profile picture

//courses routes
routes
  .route("/crud-courses")
  .post(auth, isAdmin, courses)
  .delete(auth, isAdmin, deleteCourses)
  .put(auth, isAdmin, updateCourses); //admin can access this route that create,update,delete course

routes.route("/get-all-courses/:page").get(auth, getAllCourses); //get all courses and filtered courses

routes.route("/taken-courses/:page").get(auth, getAllTakenCourses); //get taken courses by student

//enroll routes
routes.route("/enroll").post(auth, enrollCourses); //for enroll in courses

export default routes;
