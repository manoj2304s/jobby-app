import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobsWithDetails extends Component {
  state = {
    singleJobDetails: {},
    similarJobs: [],
    companyLife: {},
    skillsRequiredForCompany: [],
    jobDetailsApiStatus: apiStatusConstant.initial,
    similarJobsApiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getjobDetails()
  }

  JobDetailsRetryBtn = () => {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({jobDetailsApiStatus: apiStatusConstant.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }

      const skill = updatedData.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      this.setState({
        singleJobDetails: updatedData,
        companyLife: updatedData.lifeAtCompany,
        skillsRequiredForCompany: skill,
        jobDetailsApiStatus: apiStatusConstant.success,
      })

      this.updateSimilarJobs(data)
    } else {
      this.setState({jobDetailsApiStatus: apiStatusConstant.failure})
    }
  }

  updateSimilarJobs = data => {
    this.setState({similarJobsApiStatus: apiStatusConstant.inprogress})
    const similarJobList = data.similar_jobs.map(job => ({
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      rating: job.rating,
      title: job.title,
    }))
    this.setState({
      similarJobs: similarJobList,
      similarJobsApiStatus: apiStatusConstant.success,
    })
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccess = () => {
    const {
      singleJobDetails,
      companyLife,
      skillsRequiredForCompany,
      similarJobs,
      similarJobsApiStatus,
    } = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = singleJobDetails

    return (
      <>
        <div className="job-list-main-container extra-padding">
          <div className="logo-text-card">
            <img
              className="job-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="text-card-of-job">
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <FaStar id="star-icon" /> {rating}
              </p>
            </div>
          </div>

          <div className="job-other-deatail-card">
            <div className="job-other-card">
              <IoLocationSharp className="job-icons" />
              <p className="job-detail-location-text">{location}</p>
              <BsFillBriefcaseFill className="job-icons" />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>

          <hr className="line-break-color" />

          <div className="description-container">
            <h1 className="job-detail-title">Description</h1>
            <a className="job-detail-des" href={companyWebsiteUrl}>
              Visit
              <FaExternalLinkAlt />
            </a>
          </div>

          <p className="paragraph">{jobDescription}</p>

          <h1 className="job-detail-title extra-margin">Skills</h1>
          <ul className="skill-list-container">
            {skillsRequiredForCompany.map(skill => (
              <li className="list-skill-indi" key={skill.name}>
                <img
                  className="skill-image"
                  alt={skill.name}
                  src={skill.imageUrl}
                />
                <p>{skill.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="job-detail-title extra-margin">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-text paragraph">{companyLife.description}</p>
            <img
              className="life-at-company-image"
              alt="life at company"
              src={companyLife.image_url}
            />
          </div>
        </div>

        <h1 className="job-detail-title extra-margin">Similar Jobs</h1>
        {similarJobsApiStatus === apiStatusConstant.inprogress
          ? this.renderLoader()
          : this.renderSimilarJobsList(similarJobs)}
      </>
    )
  }

  renderSimilarJobsList = similarJobs => (
    <ul className="similar-job-container">
      {similarJobs.map(job => (
        <li className="similar-list-card" key={job.id}>
          <div className="logo-text-card">
            <img
              className="job-company-logo"
              src={job.companyLogoUrl}
              alt="similar job company logo"
            />
            <div className="text-card-of-job">
              <h1 className="job-title">{job.title}</h1>
              <p className="job-rating">
                <FaStar id="star-icon" /> {job.rating}
              </p>
            </div>
          </div>

          <div className="job-other-deatail-card">
            <div className="job-other-card">
              <IoLocationSharp className="job-icons" />
              <p className="job-detail-location-text">{job.location}</p>
              <BsFillBriefcaseFill className="job-icons" />
              <p>{job.employmentType}</p>
            </div>
          </div>

          <hr className="line-break-color" />
          <h1 className="job-detail-title">Description</h1>
          <p className="paragraph">{job.jobDescription}</p>
        </li>
      ))}
    </ul>
  )

  renderFailureView = () => (
    <div className="flex-container">
      <img
        className="failure-view"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="not-found-title">Oops! Something Went Wrong</h1>
      <p className="not-found-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.JobDetailsRetryBtn}
        className="logout-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobView = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusConstant.success:
        return this.renderJobDetailsSuccess()
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-container-al">{this.renderJobView()}</div>
      </>
    )
  }
}

export default JobsWithDetails
