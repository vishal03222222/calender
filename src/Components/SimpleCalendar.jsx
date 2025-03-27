import React, { Component } from "react";

export default class SimpleCalendar extends Component {
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

  getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

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

  render() {
    const { currentYear, currentMonth, selectedDate, todayDate, todayMonth, todayYear } = this.state;
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    
    const daysInMonth = this.getDaysInMonth(currentYear, currentMonth);
    const firstDay = this.getFirstDayOfMonth(currentYear, currentMonth);
    
    let datesArray = Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(i => i + 1));

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>SIMPLE CALENDAR</h1>
        <div style={styles.calendar}>
          <div style={styles.header}>
            <button onClick={this.handlePrevMonth} style={styles.navButton}>&lt;</button>
            <span>{monthNames[currentMonth].toUpperCase()}, {currentYear}</span>
            <button onClick={this.handleNextMonth} style={styles.navButton}>&gt;</button>
          </div>
          <div style={styles.days}>
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div key={day} style={styles.dayLabel}>{day}</div>
            ))}
          </div>
          <div style={styles.dates}>
            {datesArray.map((date, index) => (
              <div
                key={index}
                style={
                  date === null
                    ? styles.emptyDate
                    : date === todayDate && currentMonth === todayMonth && currentYear === todayYear
                    ? styles.todayDate
                    : styles.date
                }
              >
                {date}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to top, white 50%, red 50%)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  calendar: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    width: "300px",
    padding: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  navButton: {
    border: "none",
    background: "none",
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px",
  },
  days: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
    fontWeight: "bold",
    padding: "5px 0",
  },
  dayLabel: {
    padding: "5px",
  },
  dates: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
  },
  emptyDate: {
    padding: "10px",
    visibility: "hidden",
  },
  date: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "0.3s",
  },
  todayDate: {
    padding: "10px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
  },
};
