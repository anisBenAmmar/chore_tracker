import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [ErrorsB, setErrorB] = useState([])
  const [ErrorsH, setErrorH] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/login", formData)
    .then(res => {
      if (res.data && res.data.length > 0) {
        localStorage.setItem("user", res.data[0]._id)
        localStorage.setItem("userName", res.data[0].firstName + " " + res.data[0].lastName)
        navigate("/dashboard")
      } else {
        setErrorB("Veuillez vérifier votre email et/ou password")
      }
    })
    //--------- Display Errors from that come from BackEnd(mongoose) 
    .catch(err => {
     
    })
    // Réinitialiser le formulaire
    setFormData({
      email: '',
      password: ''
    });
  };

  const renderErrors = (e) => { 
    if(ErrorsB && ErrorsB.length > 0) {
      return <div className="error-box">
       {ErrorsB}
    </div>;
    } else {
      return (
          <div></div>
      );
    }
  }

  return (
    <div className='container'>
      <h1>Welcome to Chore Tracker</h1>
      { renderErrors() }
      <form className="register-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary mt-4">Login</button><br/>
        <Link to={("/")}>signin</Link>
      </form>
    </div>
  );
};

export default LoginForm;
