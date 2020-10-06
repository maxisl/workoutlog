const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");

/*Import exercise schema*/
const Exercise = require("../models/exercise");

const ExerciseController = require("../controllers/exercises");


/*ONLY "/" because you're already in "/products" when you're on this page*/
/*Returns all products*/
router.get("/", ExerciseController.exercises_get_all);

/*HANDLE POST REQUESTS*/
/*upload.single() will upload (only) one file*/
router.post("/", checkAuth, ExerciseController.exercises_create_exercise);

/*fetches the data from the database*/
router.get("/:exerciseId", ExerciseController.exercises_get_exercise);

/*update an exercise, to unterstand understand patch route (academind video 7)*/
router.patch("/:exerciseId", checkAuth, ExerciseController.exercises_update_exercise);

router.delete("/:exerciseId", checkAuth, ExerciseController.exercises_delete_exercise);

module.exports = router;