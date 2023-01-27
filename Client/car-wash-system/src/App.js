import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Customer from "./components/Customer/Customer";
import Admin from "./components/Member/Admin/Admin";
import Mechanic from "./components/Member/Mechanic/Mechanic";
import SuperUser from "./components/Member/SuperUser/SuperUser";
//NavBar Routes
import Navbar from  "./components/Home/Navbar";
import WhyUs from  "./components/Home/WhyUs";
import Contact from  "./components/Home/Contact";
import Working from  "./components/Home/Working";
// Customer Routes
import Register from "./components/Home/Register";
import Login from "./components/Home/Login";
import otpVerification from "./components/Home/otpVerfification";
import ForgetPassword from "./components/Home/ForgetPassword";
import ResetPassword from "./components/Home/ResetPassword";

import ForgetPasswordMember from "./components/Member/ForgetPasswordMember";
import ResetPasswordMember from "./components/Member/ResetPasswordMember";

// Member routes
import MemberRegister from "./components/Member/MemberRegister"
import Member_Login from "./components/Member/Member_Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
   
    
   <Router>
      <ToastContainer />
      <Navbar/>
      <Switch>
       {/* <Route exact path="/" component={Home} /> */}
       <Route path="/cust_home" component={Customer} />
        <Route path="/admin_home" component={Admin} />
        <Route path="/mechanic_home" component={Mechanic} />
        <Route path="/superUser_home" component={SuperUser} />

        {/* Navbar Routes*/}

        <Route exact path="/" component={WhyUs} />
        <Route exact path="/whyus" component={WhyUs} />
        <Route exact path="/working" component={Working} />
        <Route exact path="/contact" component={Contact} />

        {/* Customer Authentication Routes*/}
      <Route path="/Register" component={Register} />
      <Route path="/login" component={Login} />

      <Route path="/otpVerification/:userId" exact component={otpVerification} />

         <Route path="/ForgetPassword" exact component={ForgetPassword} /> 
         <Route path="/ResetPassword/:resetLink" exact component={ResetPassword} />

         <Route path="/ForgetPasswordMember" exact component={ForgetPasswordMember} /> 
         <Route path="/ResetPasswordMember/:resetLink" exact component={ResetPasswordMember} />
          
{/* Member Authentication Routes*/}
        <Route path="/member_register" component={MemberRegister} />
        <Route path="/member_login" component={Member_Login} />
        <Route path="/superUser_login" component={Member_Login} />
      </Switch>
    </Router>
  );
}

export default App;
