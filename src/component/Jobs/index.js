import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import JobSalaryRangeList from '../JobSalaryRangeList'
import JobList from '../JobList'
import JobEmploymentTypesList from '../JobEmploymentTypesList'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profile: {},
    searchInput: '',
    employType: [],
    minPackage: '',
    profileApiStatus: apiStatusConstant.initial,
    jobsApiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="50" />
    </div>
  )

  profileRetryBtn = () => {
    this.getProfile()
  }

  JobRetryBtn = () => {
    this.getJobsList()
  }

  renderProfile = () => {
    const {profileApiStatus, profile} = this.state
    const {name, profileImageUrl, shortBio} = profile

    switch (profileApiStatus) {
      case apiStatusConstant.success:
        return (
          <div className="jobs-profile-bg">
            <img
              src={profileImageUrl}
              alt="profile"
              className="job-profile-logo"
            />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-description">{shortBio}</p>
          </div>
        )
      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return (
          <div className="flex-container">
            <button
              onClick={this.profileRetryBtn}
              className="logout-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsApiStatus, jobsList} = this.state
    const jobsCount = jobsList.length

    switch (jobsApiStatus) {
      case apiStatusConstant.success:
        return jobsCount === 0 ? (
          <div className="flex-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="not-found-title">No Jobs Found</h1>
            <p className="not-found-text">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        ) : (
          <ul className="job-list">
            {jobsList.map(job => (
              <JobList key={job.id} jobDetails={job} />
            ))}
          </ul>
        )

      case apiStatusConstant.inprogress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return (
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
              onClick={this.JobRetryBtn}
              className="logout-btn"
              type="button"
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusConstant.inprogress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile: profileDetails,
        profileApiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstant.failure})
    }
  }

  getJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusConstant.inprogress})
    const {searchInput, employType, minPackage} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employType.join()}&minimum_package=${minPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstant.failure})
    }
  }

  searchInputFunction = event => {
    this.setState({searchInput: event.target.value})
  }

  searchOnEnter = event => {
    if (event.key === 'Enter') this.getJobsList()
  }

  onSalarySelection = id => {
    this.setState({minPackage: id}, this.getJobsList)
  }

  onEmployeeTypes = id => {
    this.setState(prevState => {
      const isSelected = prevState.employType.includes(id)
      return {
        employType: isSelected
          ? prevState.employType.filter(item => item !== id)
          : [...prevState.employType, id],
      }
    }, this.getJobsList)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="job-search-container-sm">
            <input
              className="input-search-box"
              onChange={this.searchInputFunction}
              onKeyDown={this.searchOnEnter}
              placeholder="Search"
              type="search"
              value={searchInput}
            />
            <button
              className="search-button"
              type="button"
              data-testid="searchButton"
            >
              <IoIosSearch
                onClick={this.getJobsList}
                className="jobs-search-icon"
              />
            </button>
          </div>

          <div className="job-container-for-large">
            {this.renderProfile()}
            <hr className="line-break-color" />
            <h1 className="heading-text">Type of Employment</h1>
            <ul className="employment-type-list">
              {employmentTypesList.map(eachType => (
                <JobEmploymentTypesList
                  key={eachType.employmentTypeId}
                  typeDetails={eachType}
                  onEmployeeTypes={this.onEmployeeTypes}
                />
              ))}
            </ul>
            <hr className="line-break-color" />
            <h1 className="heading-text">Salary Range</h1>
            <ul className="employment-type-list">
              {salaryRangesList.map(eachRange => (
                <JobSalaryRangeList
                  key={eachRange.salaryRangeId}
                  rangeDetails={eachRange}
                  onSalarySelection={this.onSalarySelection}
                />
              ))}
            </ul>
          </div>

          <div className="search-joblist-container">
            <div className="job-search-container-lg">
              <input
                className="input-search-box"
                onChange={this.searchInputFunction}
                onKeyDown={this.searchOnEnter}
                placeholder="Search"
                type="search"
                value={searchInput}
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                <IoIosSearch
                  onClick={this.getJobsList}
                  className="jobs-search-icon"
                />
              </button>
            </div>

            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
