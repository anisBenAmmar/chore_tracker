import React, { useEffect, useState } from 'react'
import {useParams, useNavigate, Link } from 'react-router-dom'
import Axios from 'axios'

const Edit = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [ErrorsB, setError] = useState([])
  const [ErrorsH, setErrorH] = useState([])

  const navigate = useNavigate()

  const { job_id } = useParams()

  useEffect(() => {
    Axios.get("http://localhost:8000/api/view/" + job_id)
      .then((response) => {
        const { title, description, location } = response.data[0]
        setTitle(title)
        setDescription(description)
        setLocation(location)
      })
  }, [])


  const updateHandler = e => {
    e.preventDefault()

    //CREATE AN OBJECT WITH THE BOOK INFO
    const newEdit = {
      title,
      description,
      location
    }
    //MAKE POST REQUEST TO EXPRESS WITH NEWBOOK
    Axios.put(`http://localhost:8000/api/edit/${job_id}`, newEdit)
      .then(err => {
        navigate("/dashboard")
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
      }
      )
      .catch(err => console.log(err))
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
    <div className="container">
    <div className="caption">
      <h3> Edit {title} </h3>
      <div className="d-inline-flex header-action-links">
        <Link className='add link-table' to={("/dashboard")}>Back</Link>
        <button className="link-table" onClick={(e) => logout()}>Logout</button>
      </div>
    </div>
    { renderBackendErrors() }
    <div className="content content-dashboard">
      <div className="content-details">
        <form className="register-form" onSubmit={updateHandler}>
          <div className="row g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="nom">Title</label>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="title" name="title" onChange={e => { setTitle(e.target.value) }} value={title} required />
              {ErrorsH.title ? <p>{ErrorsH.title}</p> : null}
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="nom">Description</label>
            </div>
            <div className="col-auto">
              <textarea type="text" className="form-control" id="description" name="description" onChange={e => { setDescription(e.target.value) }} value={description} required/>
              {ErrorsH.description ? <p>{ErrorsH.description}</p> : null}
            </div>
          </div>

          <div className="row g-3 align-items-center">
            <div className="col-4">
              <label htmlFor="nom">Location</label>
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" id="location" name="location" onChange={e => { setLocation(e.target.value) }} value={location}  required />
              {ErrorsH.location ? <p>{ErrorsH.location}</p> : null}
            </div>
          </div>
          <button className="btn btn-primary mt-4" type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Edit