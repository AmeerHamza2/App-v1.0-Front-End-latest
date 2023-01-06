import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import WhyUs from "./WhyUs";
//import Login from "./Login";
//import Register from "./REGISTER";
//import Member_Login from "../Member/Member_Login";
import Contact from "./Contact";
import Working from "./Working";
//import MemberRegister from "../../components/Member/MemberRegister"


function Home() {
  return (
    <Router>
     <Navbar />
      <Switch>
        <Route exact path="/" component={WhyUs} />
        <Route exact path="/whyus" component={WhyUs} />
        <Route exact path="/working" component={Working} />
        <Route exact path="/contact" component={Contact} />
        {/*<Route path="/member_register" component={MemberRegister} />
        <Route path="/member_login" component={Member_Login} />*/}
      </Switch>
      
  
    </Router>
  );
}

export default Home;