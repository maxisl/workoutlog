const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

const mongoose = require("mongoose");

exports.workouts_get_all = (req, res, next) => {
    Workout.find()
        .select("_id exercise name")
        .populate("exercise", "name")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                workouts: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        /*
                                                noOfExercises: doc.noOfExercises,
                        */
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/workouts/" + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.workouts_create_workout = (req, res, next) => {
    Exercise.findById(req.body.exerciseId)
        .then(exercise => {
            if (!exercise) {
                return res.status(404).json({
                    message: "Exercise not found"
                });
            }
            const workout = new Workout({
                /*use ObjectId() method to generate a workoutId*/
                _id: mongoose.Types.ObjectId(),
                exercise: req.body.exerciseId,
                name: req.body.name
                /*
                                bodypart: req.body.bodypart
                */
            });
            return workout
                .save()
        })
        .then(result => {
            if (res.statusCode === 404) {
                return res;
            }
            console.log(result);
            res.status(201).json({
                message: "Workout was stored successfully",
                createdWorkout: {
                    _id: result._id,
                    exercise: result.exercise,
                    name: result.name
                    /*
                                        bodypart: req.body.bodypart
                    */
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/workouts/" + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.workouts_get_workout = (req, res, next) => {
    const id = req.params.workoutId;
    Workout.findById(id)
        .select("_id name")
        .exec()
        .then(workout => {
            console.log("From database " + workout);
            if (workout) {
                res.status(200).json({
                    workout: workout,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/workouts"
                    }
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
            res.status(200).json(workout);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.workout_delete_workout = (req, res, next) => {
    Workout.remove({
        _id: req.params.workoutId
    })
        .populate("exercise")
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Workout deleted successfully",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/workouts",
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}