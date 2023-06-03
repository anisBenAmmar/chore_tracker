import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm';
const Register = () => {
  const [refrechstate, setRefrech] = useState(false)
  const refrech = () => {
    setRefrech(!refrechstate)
  }
  return (
    <>
      <RegisterForm refrech={refrech} />
    </>
  )
}

export default Register