import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpw: ''
  });

  const [ErrorsB, setError] = useState([])
  const [ErrorsH, setErrorH] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/register", formData)
      .then(res => {
        if (res.data && res.data.length > 0) { 
          localStorage.setItem("user", res.data[0]._id)
          localStorage.setItem("userName", res.data[0].firstName + " " + res.data[0].lastName)
          navigate("/dashboard")
        }
      })
      //--------- Display Errors from that come from BackEnd(mongoose) 
      .catch(err => {
      })

    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpw: ''
    });
  };

  return (
    <div className='container'>
      <h1>Welcome to Chore Tracker</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label htmlFor="nom">Nom</label>
          </div>
          <div className="col-auto">
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {ErrorsH.firstName ? <p>{ErrorsH.firstName}</p> : null}
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label htmlFor="lastname">Prénom</label>
          </div>
          <div className="col-auto">
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required/>
            {ErrorsH.lastName ? <p>{ErrorsH.lastName}</p> : null}
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-auto">
            <input type="email" className="form-control" name="email"
              value={formData.email}
              onChange={handleChange} required />
              {ErrorsH.email ? <p>{ErrorsH.email}</p> : null}
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-auto">
            <input type="password" className="form-control" name="password"
              value={formData.password}
              onChange={handleChange} required />
              {ErrorsH.password ? <p>{ErrorsH.password}</p> : null}
          </div>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-4">
            <label htmlFor="cfmpassword">Confirm password</label>
          </div>
          <div className="col-auto">
            <input type="password" className="form-control" name="confirmpw"
              value={formData.confirmpw}
              onChange={handleChange} required />
              {ErrorsH.confirmpw ? <p>{ErrorsH.confirmpw}</p> : null}
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">Register</button><br/>
        <Link to={("/login")}>already registred?</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
