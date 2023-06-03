import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'

const Main = () => {
  const [refrechstate, setRefrech] = useState(false)
  const refrech = () => {
    setRefrech(!refrechstate)
  }
  return (
    <>
      <Dashboard refrech={refrech} refreched={refrechstate} />
    </>
  )
}

export default Main