import React, { useState } from 'react'
import AddjobForm from '../components/AddjobForm'
const AddJobsForm = () => {
  const [refrechstate, setRefrech] = useState(false)
  const refrech = () => {
    setRefrech(!refrechstate)
  }
  return (
    <>
      <AddjobForm refrech={refrech} />
    </>
  )
}

export default AddjobForm