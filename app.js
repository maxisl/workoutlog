//TODO
//Ability to add multiple exercises to one (created) workout?
//

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const exerciseRoutes = require("./api/routes/exercises");
const workoutRoutes = require("./api/routes/workouts");
const userRoutes = require("./api/routes/user");

//Password is dynamically programmed into the nodemon.json file (deprecated, as a local db is used here)
mongoose.connect("mongodb://localhost/workout_log", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use middleware to add headers to the response (AVOID CORS-ERRORS)
app.use((req, res, next) => {
    //declare the headers and also who has access; * = everyone
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //Browser will always send an options request first if you send a post or put request
    //check if incoming method is equal to "options"
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

/*forward to exercises.js*/
//routes which should handle request = middleware
app.use("/exercises", exerciseRoutes);
app.use("/workouts", workoutRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//Run npm start from the terminal to start the app with nodemon
module.exports = app;
