import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import "./order.css";

const dotColor = { backgroundColor: "#59065f", color: "#59065f" };
export default function OrderTimeLine() {
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary">09:00 am</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotColor} />
          <TimelineConnector
            style={{
              backgroundColor: "#59065f",
              transition: "backgroundColor 2s",
            }}
          />
        </TimelineSeparator>
        <TimelineContent>Ordered </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary">09:30 am</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot style={dotColor} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Packed</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary">09:45 am</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Shipped</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary">10:30 am</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Delivered</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
