const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const WorkoutController = require("../controllers/workouts");

router.get("/", checkAuth, WorkoutController.workouts_get_all);

router.post("/", checkAuth, WorkoutController.workouts_create_workout);

router.get("/:workoutId", WorkoutController.workouts_get_workout);

router.delete("/:workoutId", checkAuth, WorkoutController.workout_delete_workout);


module.exports = router;