import { CSVLink } from "react-csv";

import React from "react";

const ExportCSV = ({ headers, data, filename }) => {
  // const headers = [
  //   { label: "First Name", key: "firstname" },
  //   { label: "Last Name", key: "lastname" },
  //   { label: "Email", key: "email" },
  //   { label: "test", key: "x[0].a" },
  // ];

  // const data = [
  //   {
  //     firstname: "Ahmed",
  //     lastname: "Tomi",
  //     email: "ah@smthing.co.com",
  //     x: [{ a: "xx" }],
  //   },
  //   {
  //     firstname: "Raed",
  //     lastname: "Labes",
  //     email: "rl@smthing.co.com",
  //     x: [{ a: "xxkk" }],
  //   },
  //   {
  //     firstname: "Yezzi",
  //     lastname: "Min l3b",
  //     email: "ymin@cocococo.com",
  //     x: [{ a: "xllx" }],
  //   },
  // ];

  return (
    <div>
      <CSVLink data={data} filename={filename} headers={headers}>
        Download me
      </CSVLink>
    </div>
  );
};

export default ExportCSV;
