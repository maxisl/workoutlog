const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // use ref to configure the type: use the name you want to connect the model to
    exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true},
    name: {type: String, required: true},
/*
    noOfExercises: {type: String, default: 1}
*/
});

module.exports = mongoose.model("Workout", workoutSchema);