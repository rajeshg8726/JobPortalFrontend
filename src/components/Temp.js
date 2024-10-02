import React from 'react'

const Temp = () => {
  return (
    <>
 

   {/* form component */}
    <div className='container'>  
    <form className='containerForm' >
      <div className="mb-3">
        <label htmlFor="jobTitle" className="form-label">Company Name</label>
        <input type="text" className="form-control" id="title" name="title"   />
      </div>
      <div className="mb-3">
        <label htmlFor="jobtype" className="form-label">Job Type</label>
        <input type="text" className="form-control" id="jobtype" name="jobtype"   />
      </div>
      <div className="mb-3">
        <label htmlFor="jobRole" className="form-label">Job Role</label>
        <input type="text" className="form-control" id="role" name="role"   />
      </div>
      <div className="mb-3">
        <label htmlFor="forBatches" className="form-label">For Batches</label>
        <input type="text" className="form-control" id="batches" name="batches"   />
      </div>
      <div className="mb-3">
        <label htmlFor="expectedPay" className="form-label">Expected Pay</label>
        <input type="text" className="form-control" id="pay" name="pay"   />
      </div>
      <div className="mb-3">
        <label htmlFor="jobLocations" className="form-label">Job Locations</label>
        <input type="text" className="form-control" id="location" name="location"   />
      </div>
      <div className="mb-3">
        <label htmlFor="jobDescriptions" className="form-label">Job Descriptions</label>
        <input type="text" className="form-control" id="description" name="description"   />
      </div>
      <div className="mb-3">
        <label htmlFor="jobDescriptions" className="form-label">Job Link</label>
        <input type="text" className="form-control" id="joblink" name="joblink"  />
      </div>
      <div className="mb-3">
        <label htmlFor="companyLogo" className="form-label">Company Logo</label>
        <input type="file" className="form-control" id="companyLogo" name="companyLogo"  />
      </div>
      <button type="submit" className="btn btn-primary btnsub">Submit</button>
    </form>
    {/* {message && <div className="alert alert-info mt-3">{message}</div>} Conditional message display */}
  </div>

  </>
  )
}

export default Temp