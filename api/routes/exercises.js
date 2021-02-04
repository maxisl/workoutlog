const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");

// import exercise schema
const Exercise = require("../models/exercise");

const ExerciseController = require("../controllers/exercises");


/*ONLY "/" because you're already in "/exercises" when you're on this page*/
// Returns all exercises
router.get("/", ExerciseController.exercises_get_all);

/*HANDLE POST REQUESTS*/
// create an exercise for the db (needs authentication)
router.post("/", checkAuth, ExerciseController.exercises_create_exercise);

// fetches a specific exercise from the database
router.get("/:exerciseId", ExerciseController.exercises_get_exercise);

// update an exercise (needs authentication)
router.patch("/:exerciseId", checkAuth, ExerciseController.exercises_update_exercise);

// delete a specific exercise (needs authentication)
router.delete("/:exerciseId", checkAuth, ExerciseController.exercises_delete_exercise);

module.exports = router;