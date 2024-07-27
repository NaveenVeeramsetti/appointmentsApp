// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointment extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isActiveStarred: false,
  }

  isToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFiltered = () => {
    const {isActiveStarred} = this.state

    this.setState({
      isActiveStarred: !isActiveStarred,
    })
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {dateInput, titleInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTextInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentList = () => {
    const {isActiveStarred, appointmentList} = this.state
    if (isActiveStarred) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isActiveStarred} = this.state
    const isStarredClassNames = isActiveStarred
      ? 'active starred-button'
      : 'starred-button'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="form-container">
            <form className="from" onSubmit={this.onSubmitEvent}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="textBoxId" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="input-element"
                id="textBoxId"
                placeholder="Title"
                onChange={this.onChangeTextInput}
                value={titleInput}
              />
              <label htmlFor="dateBoxId" className="label">
                Date
              </label>
              <input
                type="date"
                className="input-element"
                id="dateBoxId"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-container">
            <h1 className="bottom-heading">Appointments</h1>
            <button
              className={isStarredClassNames}
              type="button"
              onClick={this.onFiltered}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                isToggleStar={this.isToggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointment
