const { Jobs } = require("../models/Jobs.model")

module.exports.test = (req, res) => {
    res.json("The server say hello world")
}

//Create a new Job
module.exports.CreateJobs = (req, res) => {
    Jobs.create(req.body)
        .then(newJobs => { res.json({ Jobs: newJobs }) })
        .catch(err => res.status(400).json({
            messge: "Somthing went wrong", error: err
        }))
}

//Read Alljob
module.exports.findAllJobs = (req, res) => {
    Jobs.find({ myjob: 0 })
        .then(Jobs => { res.json(Jobs) })
        .catch(err => res.status(400).json({
            messge: "Somthing went wrong", error: err
        }))

}

//Read all myjobs
module.exports.findMyJobs = (req, res) => {
    Jobs.find({ myjob: req.params.user_id })
        .then(Jobs => { res.json(Jobs) })
        .catch(err => res.status(400).json({
            messge: "Somthing went wrong", error: err
        }))

}

// Get job
module.exports.findJobs = (req, res) => {
    Jobs.find({ _id: req.params.Job_id })
        .then(oneJobs => res.json(oneJobs))
        .catch(err => res.status(400).json(err))
}



//Delete One job
module.exports.DeleteJob = (req, res) => {
    Jobs.deleteOne({ _id: req.params.Job_id })
        .then(result => res.json("Delete with succ"))
        .catch(err => res.status(400).json(err))
}

//Update One job 
module.exports.UpadateOneJobs = (req, res) => {
    console.log(req.body)
    Jobs.findOneAndUpdate({ _id: req.params.Job_id }, req.body, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
}


