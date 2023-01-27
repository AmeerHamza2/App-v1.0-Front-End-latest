import axios from "axios";
import authHeader from "../member/auth_header";
import { toast } from "react-toastify";


const AUTH_URL = "http://localhost:8088/admin/auth/";

const AUTH_URL_1 = "http://localhost:8088/admin/auth/";

class AuthService {
  constructor() {
    this.authenticated = false;
  }

  login(email, password) {
    return axios
      .post(AUTH_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          if (response.data.role === "ADMIN") {
            console.log(response.data.name);
            this.authenticated = true;
            localStorage.setItem("admin", JSON.stringify(response.data));
          }
          if (response.data.role === "MECHANIC") {
            console.log(response.data.name);
            this.authenticated = true;
            localStorage.setItem("mechanic", JSON.stringify(response.data));
          }
          if (response.data.role === "SUPER") {
            console.log(response.data.name);
            this.authenticated = true;
            localStorage.setItem("super", JSON.stringify(response.data));
          }
        }
        console.log(response.data.role);
        
        return response.data;
      })
      .catch((err) => {
        toast.error("Invalid Email or Password !", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log("Login Error" + err);
      });
  }

  /*registerMechanic(firstname,lastname, email, password, mobile, role,serviceProviderId) {
    return axios.post(AUTH_URL + `registerMechanic/`, {
      firstname,
      lastname,
      email,
      password,
      mobile,
      role,
      serviceProviderId
    });
  }*/
  registerMechanic(formData) {
    return axios.post(AUTH_URL + `registerMechanic/`, {
     formData,
     
  
    
    });
  }

  logout() {
    localStorage.removeItem("admin");
    console.log("Inside Logout Method");
  }

  logoutMechanic() {
    localStorage.removeItem("mechanic");
    console.log("Inside Logout Method");
  }
  logoutSuperUser() {
    localStorage.removeItem("super");
    console.log("Inside Logout Method");
  }

  register(firstname, lastname, email, password, mobile,role) {
   //  role  = "ADMIN";
    return axios.post(AUTH_URL + "register", {
      firstname,
      lastname,
      email,
      password,
      mobile,
      role,
      
    });
  }

  getCurrentMechanic() {
    return JSON.parse(localStorage.getItem("mechanic"));
  }

  getAdmin() {
    return JSON.parse(localStorage.getItem("admin"));
  }
  getSuperUser() {
    return JSON.parse(localStorage.getItem("super"));
  }

  resetPassword(resetLink,newPass) {
    return axios
      .put(AUTH_URL + "resetPassword", { resetLink,newPass })
      .then((response) => {
        
       
        return response.data;
      })
      .catch((err) => {
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

  // getServiceProvider(_id) {
  //   return axios
  //     .get(AUTH_URL + "getServiceProvider", {_id})
  //     .then((res) => {
  //       return res.data.response
  //     })
  //     .catch((err) => {
  //       console.log("Error" + err);
  //     });
  // }

}

export default new AuthService();
