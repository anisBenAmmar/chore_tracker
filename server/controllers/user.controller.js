const { Users } = require("../models/user.model")
module.exports.register = (req, res) => {
    Users.findOneAndUpdate({ email: req.body.email }, req.body, { upsert: true, new: true })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
}

module.exports.login = (req, res) => {
    Users.find({ email: req.body.email, password:req.body.password })
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err))
}