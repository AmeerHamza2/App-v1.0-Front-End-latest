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
 // const serviceProvider = AuthService.getAdmin();

  const itemList = [
    {
      text: "HOME",
      icon: <HomeIcon />,
      onClick: () => history.push("/superUser_home"),
    },
    
    {
      text: "Blogs",
      icon: <BallotIcon />,
      onClick: () => history.push("/superUser_home/Blogs"),
    },
    {
      text: "Service Providers",
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push("/superUser_home/mechanics"),
    },
    {
      text: "Users",
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push("/superUser_home/users"),
    },
    {
      text: "Orders",
      icon: <MonetizationOnIcon />,
      onClick: () => history.push("/superUser_home/orders"),
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      onClick: () => history.push("/login"),
    },
  ];

 /* const getCompletedOrders = () => {
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

  }, []);*/

  

  return (
    <div className="admin_home">
      <hr />
      <h1>WELCOME SUPER USER</h1>
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
