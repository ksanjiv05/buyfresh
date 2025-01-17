import React from "react";

const timeSlot = [
  { slot1: "08:00AM-10:00AM" },
  { slot2: "01:00PM-3:00PM" },
  { slot3: "05:00PM-7:00PM" },
];
const days = ["Today", "Tomorrow"];
const hours = new Date().getHours();
const chours = hours > 12 ? hours - 12 : hours;
const today = new Date();
today.setDate(new Date().getDate() + 1);
const TimeSlot = (props) => {
  return (
    <div className="checkout-container">
      <h1 style={{ color: "#717477" }}>Choose Time Slot </h1>
      <div className="time-slot-flex">
        {days.map((day, index) => {
          return (
            <div key={day} style={{ marginRight: "30px" }}>
              <h2>
                {index === 0 ? new Date().toDateString() : today.toDateString()}
              </h2>
              {timeSlot.map((v, i) => {
                let slot = "slot" + (i + 1);

                return (
                  <div className="time-slot" key={i}>
                    <input
                      type="radio"
                      name="timeslot"
                      className="time-slot-input"
                      onChange={(e) =>
                        props.handleChange(e.target.name, e.target.value)
                      }
                      value={v[slot] + " / " + day}
                      disabled={
                        index === 1
                          ? false
                          : hours < 12
                          ? parseInt(v[slot].slice(0, 2)) > hours
                            ? false
                            : true
                          : v[slot].charAt(5) === "P"
                          ? parseInt(v[slot].slice(0, 2)) > chours
                            ? false
                            : true
                          : true
                      }
                      key={i}
                    />
                    <label>{v[slot]}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlot;
