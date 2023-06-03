import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';
const Login = () => {
  const [refrechstate, setRefrech] = useState(false)
  const refrech = () => {
    setRefrech(!refrechstate)
  }
  return (
    <>
      <LoginForm refrech={refrech} />
    </>
  )
}

export default Login