import React from "react";

const timeSlot = [
  { slot1: "8:00AM-10:00AM" },
  { slot2: "12:00AM-3:00PM" },
  { slot3: "5:00PM-7:00PM" },
];
const TimeSlot = (props) => {
  return (
    <div className="checkout-container">
      <h1 style={{ color: "#717477" }}>Choose Time Slot </h1>
      {timeSlot.map((v, i) => {
        let slot = "slot" + (i + 1);

        return (
          <div className="time-slot">
            <input
              type="radio"
              name="timeslot"
              className="time-slot-input"
              onChange={(e) =>
                props.handleChange(e.target.name, e.target.value)
              }
              value={v[slot]}
              key={i}
            />
            <label>{v[slot]}</label>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlot;
