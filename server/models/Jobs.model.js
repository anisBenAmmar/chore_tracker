const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema({

   location: {
        type: String,
        required: [true, "Location is required"],
   },
   myjob: {
        type: Number,
        required: [false, ""],
        default: 0
   },
   title: {
    type: String,
    required: [true, "Title is required"],
    min: [3, "minimum of Title must be greater than 3"]
    
},
   description: {
    type: String,
    required: [true, "Description is required"],
    min: [10, "minimum of Descrption must be greater than 10"]

}
}, { timestamps: true })


module.exports.Jobs = mongoose.model("Jobs", JobsSchema);
