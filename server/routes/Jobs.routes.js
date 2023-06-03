const JobsController = require("../controllers/Jobs.controller")
const UsersController = require("../controllers/user.controller")



module.exports = (app) => {
    app.get("/api/allJobs", JobsController.findAllJobs)
    app.get("/api/allMyJobs", JobsController.findMyJobs)
    app.post("/api/addJob", JobsController.CreateJobs)
    app.get("/api/view/:Job_id", JobsController.findJobs)
    app.delete("/api/deleteJob/:Job_id", JobsController.DeleteJob)
    app.put("/api/edit/:Job_id", JobsController.UpadateOneJobs)
    app.post("/api/user/register",UsersController.register )
    app.post("/api/user/login",UsersController.login )
}
