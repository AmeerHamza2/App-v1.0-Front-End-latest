import axios from "axios";
import mechHeader from "../mech_header";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8088/admin/mechanic/";
const ACC_URL = "http://localhost:8020/mechanic/account/";

const API_URL1 = "http://localhost:4000/admin/mechanic/";



class MechanicService {
  findAll(serviceProviderId) {
    return axios
      .get(API_URL + `findAll/${serviceProviderId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  deleteAccount(id) {
    return axios
      .delete(ACC_URL + `delete/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  updateAccount(
    id,
    firstname,
    lastname,
    email,
    mobile,
    status,
   
  ) {
    return axios
      .put(
        ACC_URL + `update/${id}`,
        { id, firstname,lastname, email, mobile, status },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  findAvailable(serviceProviderId) {
    return axios
      .get(API_URL + `findAvailable/${serviceProviderId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Service Providers Data
  findAllServiceProviders() {
    return axios
      .get(API_URL1 + `findAllServiceProviders/`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteServiceProviderAccount(id) {
    return axios
      .delete(ACC_URL + `deleteServiceProvider/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateServiceProvider(
    id,
    firstname,
    lastname,
    email,
    mobile,
    status,
    verify
   
  ) {
    return axios
      .put(
        ACC_URL + `updateServiceProvider/${id}`,
        { id, firstname,lastname, email, mobile, status, verify },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}



export default new MechanicService();
