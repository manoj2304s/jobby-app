import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const jobsList = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-list-main-container">
      <Link to={`/jobs/${id}`}>
        <div className="logo-text-card">
          <img
            className="job-company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="text-card-of-job">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              {' '}
              <FaStar id="star-icon" /> {rating}
            </p>
          </div>
        </div>
        <div className="job-other-deatail-card">
          <div className="job-other-card">
            <IoLocationSharp className="job-icons" />
            <p className="job-detail-location-text"> {location}</p>
            <BsFillBriefcaseFill className="job-icons" />
            <p className="job-detail-location-text"> {employmentType} </p>
          </div>
          <p> {packagePerAnnum}</p>
        </div>
        <hr className="line-break-color" />
        <h1 className="heading">Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}
export default jobsList
