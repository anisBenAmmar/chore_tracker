import React, { useState } from 'react'
import Axios from "axios"
import { useNavigate, Link } from 'react-router-dom';

const AddjobForm = (props) => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [ErrorsB, setError] = useState([])
  const [ErrorsH, setErrorH] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    //---------Create An Object with the Job Info
    const newJob = {
      title,
      description,
      location
    }
    //---------Make POST REQUEST TO EXpress with NewJob
    Axios.post("http://localhost:8000/api/addJob", newJob)
      .then(res => {
        navigate("/dashboard")
      })
      //--------- Display Errors from that come from BackEnd(mongoose) 
      .catch(err => {
        const errorResponce = err.response.data.error.errors
        const errArr = []
        const errObj = {}
        for (const key of Object.keys(errorResponce)) {
          console.log("======>", errorResponce[key])
          errArr.push(errorResponce[key].message)
          errObj[key] = errorResponce[key].message
        }
        setError(errArr)
        setErrorH(errObj)
      })
  }

  const logout = (e) => {
    localStorage.removeItem("user")
    localStorage.removeItem("userName")
    navigate("/")
  };

  const renderBackendErrors = (e) => { 
    if(ErrorsB && ErrorsB.length > 0) {
      return <div className="error-box">
      {
        ErrorsB.map((err, key) => {
          return (
            <p key={key}>{err}</p>
          )
        })
      }
    </div>;
    } else {
      return (
          <div></div>
      );
    }
  }

  return (
    <>
      <div className="container">
        <div className="caption">
          <h3>Add a Job</h3>
          <div className="d-inline-flex header-action-links">
            <Link className='add link-table' to={("/dashboard")}>Back</Link>
            <button className="link-table" onClick={(e) => logout()}>Logout</button>
          </div>
        </div>
          { renderBackendErrors() }
        <div className="content content-dashboard">
          <div className="content-details">
            <form className="register-form" onSubmit={submitHandler}>
              <div className="row g-3 align-items-center">
                <div className="col-4">
                  <label htmlFor="nom">Title</label>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" id="title" name="title" onChange={e => { setTitle(e.target.value) }} value={title} checked="" />
                  {ErrorsH.title ? <p>{ErrorsH.title}</p> : null}
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-4">
                  <label htmlFor="nom">Description</label>
                </div>
                <div className="col-auto">
                  <textarea type="text" className="form-control" id="description" name="description" onChange={e => { setDescription(e.target.value) }} value={description} />
                  {ErrorsH.description ? <p>{ErrorsH.description}</p> : null}
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <div className="col-4">
                  <label htmlFor="nom">Location</label>
                </div>
                <div className="col-auto">
                  <input type="text" className="form-control" id="location" name="location" onChange={e => { setLocation(e.target.value) }} />
                  {ErrorsH.location ? <p>{ErrorsH.location}</p> : null}
                </div>
              </div>
              <button className="btn btn-primary mt-4" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default AddjobForm