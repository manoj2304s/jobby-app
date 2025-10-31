import './index.css'

const JobEmploymentTypesList = props => {
  const {typeDetails, onEmployeeTypes} = props
  const {label, employmentTypeId} = typeDetails
  const selectEmployeeType = () => {
    onEmployeeTypes(employmentTypeId)
  }
  return (
    <li className="employee-list">
      <input
        className="checkbox"
        type="checkbox"
        value={employmentTypeId}
        id={employmentTypeId}
        onChange={selectEmployeeType}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}
export default JobEmploymentTypesList
