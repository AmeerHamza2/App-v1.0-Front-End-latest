import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { Switch, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import Cars from "./Cars";
import Blogs from "./Blogs";

import Mechanic from "./Mechanic";
import User from "./Users";
import Orders from "./Order";

import AuthService from "../../../services/member/auth_service";

function Admin(props) {
  useEffect(() => {
    const superUser = AuthService.getSuperUser();

    if (superUser === null) {
      props.history.push("/login");
    }
  }, []);
  return (

  
    <div>

  
      <AdminNav />
      
      <AdminHome />
      <Switch>
        {/* <Route exact path="/admin_home" component={AdminHome} /> */}
        <Route path="/superUser_home/cars" component={Cars} />
        <Route path="/superUser_home/Blogs" component={Blogs} />
        <Route path="/superUser_home/mechanics" component={Mechanic} />
        <Route path="/superUser_home/users" component={User} />
        <Route path="/superUser_home/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default Admin;
