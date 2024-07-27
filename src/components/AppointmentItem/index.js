// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isToggleStar} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    isToggleStar(id)
  }

  return (
    <li className="appointment-list-item">
      <div className="single-appointment-container">
        <div>
          <p className="appointment-name">{title}</p>
          <p className="date">Date: {date}</p>
        </div>
        <button
          data-testid="star"
          className="star-button"
          type="button"
          onClick={onClickStar}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
