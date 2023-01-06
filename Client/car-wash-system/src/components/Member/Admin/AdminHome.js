import React, { useEffect, useState } from "react";
import "./CSS/AdminHome.css";
import HomeIcon from "@material-ui/icons/Home";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import BallotIcon from "@material-ui/icons/Ballot";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Portal,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AuthService from "../../../services/member/auth_service"

function AdminHome(props) {
  const { history } = props;
  const [orders, setOrders] = useState([]);
  const [pOrders, setpOrders] = useState([]);
  const serviceProvider = AuthService.getAdmin();

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => history.push("/admin_home"),
    },
    {
      text: "CARS",
      icon: <DriveEtaIcon />,
      onClick: () => history.push("/admin_home/cars"),
    },
    {
      text: "Services",
      icon: <BallotIcon />,
      onClick: () => history.push("/admin_home/packages"),
    },
    {
      text: "Mechanics",
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push("/admin_home/mechanics"),
    },
    {
      text: "Orders",
      icon: <MonetizationOnIcon />,
      onClick: () => history.push("/admin_home/orders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/login"),
    },
  ];

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders(serviceProvider.userId)
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });


  };

  const getInProcessOrders = () => {
    AdminOrders.findPlacedOrders(serviceProvider.userId)
      .then((res) => {
        setpOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });


  };


  useEffect(() => {
    getCompletedOrders();
   getInProcessOrders();

  }, []);

  

  return (
    <div className="admin_home">
      <hr />
      <h1>WELCOME ADMIN</h1>
      <h1>
        Your Total Earnings: PKR 
        {orders ? (orders
          .map((order) => order.servicePrice)
          .reduce((prev, next) => prev + next, 0)): "0"}
      </h1>
      <hr />
      <hr />
      <h2><strong>Order Details</strong></h2>
      <h3>
        Your Total Orders: 
        {orders && pOrders ? (orders.length + pOrders.length): "0"}
      </h3>
      <h3>
        Completed Orders: 
        {orders? (orders.length) : "0"}
      </h3>
      <h3>
        Accepted In Process Orders: 
        {pOrders ? (pOrders.length) : "0"}
      </h3>
      <hr />

      <Drawer variant="permanent" className="drawer">
        <List>
          {itemList.map((item, index) => {
            return (
              <ListItem button key={item.text} onClick={item.onClick}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(AdminHome);
