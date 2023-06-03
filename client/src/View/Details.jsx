import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Details = () => {
  const [job, setJob] = useState()
  const { job_id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/view/${job_id}`)
      .then((res) => {
        setJob(res.data)
      })
      .catch((err => console(err)))
  }, [])

  const jobState = (state) => {
    if (state) return 'Yes'
    return 'No'
  }

  const addMyJobHandler = e => {
    //CREATE AN OBJECT WITH THE Job INFO
    job[0].myjob = localStorage.getItem("user")
    const updatedJob = {
      title: job[0].title,
      description: job[0].description,
      location: job[0].location,
      myjob: Number(job[0].myjob),
    }
    Axios.put(`http://localhost:8000/api/edit/${job_id}`, updatedJob)
      .then(res => {
        navigate("/dashboard")
      }
      )
      .catch(err => console.log(err))
  }

  const logout = (e) => {
    localStorage.removeItem("user")
    localStorage.removeItem("userName")
    navigate("/")
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const maDate = new Date(date)
    return maDate.toLocaleDateString("en-US", options);
  }


  return (
    <>
      {
        (job) ?
          <div className="container">
            <div className="caption">
              <h3> Détails {job[0].title} </h3>
              <div className="d-inline-flex header-action-links">
                <Link className='add link-table' to={("/dashboard")}>Back</Link>
                <button className="link-table" onClick={(e) => logout()}>Logout</button>
              </div>
            </div>
            <div className="content content-dashboard">
              <div>
                <div>
                  <h2>{job[0].title}</h2>
                </div>
                <div className="card-view-details">
                  <p>{job[0].description}</p>
                  <p><b>Location</b>: {job[0].location}</p>
                  <p><b>Posted by</b>: {localStorage.getItem("userName")}</p>
                  <p><b>Posted on</b>: { formatDate(job[0].createdAt) }</p>
                </div>
                <button className="btn btn-primary" onClick={(e) => addMyJobHandler(job[0]._id)}>Add To My Jobs</button>
              </div>
            </div>
          </div> : null
      }
    </>
  )
}

export default Details