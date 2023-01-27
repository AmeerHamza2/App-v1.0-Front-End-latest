import axios from "axios";
import { toast } from "react-toastify";
const AUTH_URL = "http://localhost:8080/customer/auth/";

class AuthService {
  constructor() {
    this.authenticated = false;
  }
  login(email, password) {
    return axios
      .post(AUTH_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          console.log(response.data.userId);
          this.authenticated = true;
          localStorage.setItem("customer", JSON.stringify(response.data));
        }
       
        return response.data;
      })
      .catch((err) => {
       
        console.log("Login Error: " + err);

        return err;
      });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem("customer");
    console.log("Inside Logout Method");
  }

  register(firstname, lastname, email, password) {
    return axios
    .post(AUTH_URL + "register", {
      firstname,
      lastname,
      email,
      password,
    })
    .then((response) => {
        
      toast.success("check your mail for OTP Verification!!", {
        position: toast.POSITION.TOP_CENTER
      });
      return response.data;
    })
    .catch((err) => {
      toast.error("User with this Mail already Exist!!", {
        position: toast.POSITION.TOP_CENTER
      });
      console.log("Login Error: " + err);
      return err;
    });
  }

  resetPassword(resetLink,newPass) {
    return axios
      .put(AUTH_URL + "resetPassword", { resetLink,newPass })
      .then((response) => {
        
        toast.success("Password Reset Successfully!!", {
          position: toast.POSITION.TOP_CENTER
        });
        return response.data;
      })
      .catch((err) => {
        toast.error("Link Expired.kindly again verify you Email.", {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("Login Error: " + err);
        return err;
      });
  }
  verifyOTP(userId,otp) {
    return axios
      .post(AUTH_URL + "verifyOTP", { userId,otp })
      .then((response) => {
        
        toast.success("Email Verified Successfully!!", {
          position: toast.POSITION.TOP_CENTER
        });
        return response.data;
      })
      .catch((err) => {
        toast.error("Otp Expired or Wrong.kindly again verify you Email.", {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("Login Error: " + err);
        return err;
      });
  }

  forgotPassword(email) {
    return axios
      .put(AUTH_URL + "forgotPassword", { email })
      .then((response) => {
       
        toast.success("check your Mail!", {
          position: toast.POSITION.TOP_CENTER
        });
  
  
        return response.data;
      })
      .catch((err) => {
        
        console.log(err);
        
      });
  }
  

  isAuthenticated() {
    return this.authenticated;
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("customer"));
  }
}




export default new AuthService();
