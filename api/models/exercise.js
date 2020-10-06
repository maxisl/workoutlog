const mongoose = require("mongoose");

/*gets triggered by the POST request in exercises.js*/
const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    bodypart: {type: String, required: true},
    sets: {type: Number, required: true, default: 1},
    reps: {type: Number, required: true, default: 1}
});


/*Exercise model setup*/
module.exports = mongoose.model("Exercise", exerciseSchema);