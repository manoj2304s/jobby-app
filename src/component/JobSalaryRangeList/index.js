import './index.css'

const JobSalaryRangeList = props => {
  const {rangeDetails, onSalarySelection} = props
  const {label, salaryRangeId} = rangeDetails

  const selectSalary = event => {
    onSalarySelection(event.target.value)
  }

  return (
    <li className="employee-list">
      <input
        onChange={selectSalary}
        className="checkbox"
        type="radio"
        name="salaryRange"
        id={salaryRangeId}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default JobSalaryRangeList
