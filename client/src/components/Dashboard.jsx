import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from "axios"
const Dashboard = (props) => {
    const [AllJobs, setAllJobs] = useState([])
    const [MyJobs, setMyJobs] = useState([])

    const { refrech, refreched } = props
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/allJobs")
            .then(response => {
                setAllJobs(response.data)
            })
            .catch(err => console.log(err))
        axios.get("http://localhost:8000/api/allMyJobs")
            .then(response => {
                setMyJobs(response.data)
            })
            .catch(err => console.log(err))
    }, [refreched])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deleteJob/${id}`)
            .then(response => { refrech() })
            .catch(err => console.log(err))
    }

    const addMyJobHandler = (job) => {
        //CREATE AN OBJECT WITH THE Job INFO
        const updatedJob = {
          title: job.title,
          description: job.description,
          location: job.location,
          myjob: Number(localStorage.getItem("user"))
        }
        axios.put(`http://localhost:8000/api/edit/${job._id}`, updatedJob)
          .then(res => {
            refrech() 
          }
          )
          .catch(err => console.log(err))
    }

    const logout = (e) => {
        localStorage.removeItem("user")
        localStorage.removeItem("userName")
        navigate("/")
      };
    

    return (
        <>
            <div className="container">
                <div className="caption">
                    <h4>Welcome {localStorage.getItem("userName")} </h4>
                    <button className="logout-link" onClick={(e) => logout()}>Logout</button>
                    <Link className="btn btn-primary" type="submit" to={("/addJob")} >Add A Job </Link>
                </div>
                <div className="content content-dashboard d-flex mr-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllJobs.map((job, index) => {
                                    return <tr key={index}>
                                        <td>{job.title}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <div className="action-box d-flex justify-content-center">
                                                <div className="ml-1">
                                                    <Link className='view link-table' to={("/view/"+ job._id)}>View</Link>
                                                </div>
                                                <div className="ml-1">
                                                    <button className="link-table" onClick={(e) => addMyJobHandler(job)}>Add</button>
                                                </div>
                                                <div className="ml-1">
                                                    <Link className='edit link-table' to={("/edit/" + job._id)}>Edit</Link>
                                                </div>
                                                <div className="ml-1">
                                                    <button className="link-table" onClick={(e) => deleteHandler(job._id)}>Cancel</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                })
                            }

                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={2}>My Jobs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                MyJobs.map((job, index) => {
                                    return <tr key={index}>
                                        <td>{job.title}</td>
                                        <td>
                                            <div className="action-box d-inline-flex justify-content-center">
                                                <div className="ml-1">
                                                    <Link className='view link-table' to={("/view/"+ job._id)}>View</Link>
                                                </div>
                                                <div className="ml-1">
                                                    <button className="link-table" onClick={(e) => deleteHandler(job._id)}>Done</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>   
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Dashboard