// import * as React from "react";
// import AddProduct from "./saller/AddProduct";
// import ProductList from "./saller/ProductList";

// const AdminIndex = () => {
//   return (
//     <div>
//       <AddProduct />
//       {/* <ProductList /> */}
//     </div>
//   );
// };
// export default AdminIndex;

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AddProduct from "./saller/AddProduct";
import ProductList from "./saller/ProductList";
import OrderList from "./saller/OrderList";
import Context from "../../Context";
import ExportCSV from "./saller/ExportCSV";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function AdminDashboard() {
  const { isAdmin, isAuthenticate } = useContext(Context);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticate) {
      history.push("/login");
    }
    console.log(isAuthenticate, "--authh--", isAdmin);
  }, [isAuthenticate]);
  return isAdmin ? (
    <>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}>
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="Products" {...a11yProps(1)} />
          <Tab label="Orders" {...a11yProps(2)} />
          {/* <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
          <AddProduct />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <ExportCSV /> */}
          <OrderList />
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
      </div>
    </>
  ) : (
    <Redirect to="/login" />
  );
}
