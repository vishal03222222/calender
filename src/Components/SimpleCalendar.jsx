import React, { Component } from "react";
import "./Calendar.css"; 

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      selectedDate: today.getDate(),
      todayDate: today.getDate(),
      todayMonth: today.getMonth(),
      todayYear: today.getFullYear(),
    };
  }

  getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  handlePrevMonth = () => {
    this.setState((prevState) => ({
      currentMonth: prevState.currentMonth === 0 ? 11 : prevState.currentMonth - 1,
      currentYear: prevState.currentMonth === 0 ? prevState.currentYear - 1 : prevState.currentYear,
    }));
  };

  handleNextMonth = () => {
    this.setState((prevState) => ({
      currentMonth: prevState.currentMonth === 11 ? 0 : prevState.currentMonth + 1,
      currentYear: prevState.currentMonth === 11 ? prevState.currentYear + 1 : prevState.currentYear,
    }));
  };

  handleDateClick = (date) => {
    if (date) {
      this.setState({ selectedDate: date });
    }
  };

  render() {
    const { currentYear, currentMonth, selectedDate, todayDate, todayMonth, todayYear } = this.state;
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = this.getDaysInMonth(currentYear, currentMonth);
    const firstDay = this.getFirstDayOfMonth(currentYear, currentMonth);

    let datesArray = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));

    return (
      <div>
        
        <div className="calendar-container">

<div className="calendar" > 
      {/* Header */}
      <b><h2>CALENDER</h2></b>
  <div className="calendar-header">
   
    <span className="calendar-year">{currentYear}</span>
    <span className="calendar-month">{monthNames[currentMonth]}</span>
    <div className="calendar-nav-buttons">
      <button onClick={this.handlePrevMonth} className="calendar-nav-button">←</button>
      <button onClick={this.handleNextMonth} className="calendar-nav-button">→</button>
    </div>
  </div>

  {/* Week Days */}
  <div className="calendar-days-row">
    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
      <div key={day} className="calendar-day">{day}</div>
    ))}
  </div>

  {/* Dates */}
  <div className="calendar-dates-grid">
    {datesArray.map((date, index) => (
      <div
        key={index}
        className={`calendar-date-cell 
          ${date === null ? "empty-cell" : ""}
          ${date === selectedDate ? "selected-date" : ""}
          ${date === todayDate && currentMonth === todayMonth && currentYear === todayYear ? "today" : ""}
        `}
        onClick={() => this.handleDateClick(date)}
      >
        {date}
      </div>
    ))}
  </div>
</div>
</div>
      </div>
    );
  }
}
