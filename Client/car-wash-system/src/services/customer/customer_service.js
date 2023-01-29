import axios from "axios";
import authHeader from "./authentication/auth_header";

const ORDER_URL = "http://localhost:8030/order/";
const CUST_ORDER = "http://localhost:8080/customer/order/";
const ACC_URL="http://localhost:8080/customer/account/";
class CustomerService {
  placeOrder(
    customerId,
    firstName,
    email,
    carName,
    carNumber,
    custAddress,
    serviceName,
    servicePrice,
    serviceProviderId,
    paymentMethod,
  ) {
    return axios
      .post(
        ORDER_URL + "addOrder",
        {
          customerId,
          firstName,
          email,
          carName,
          carNumber,
          custAddress,
          serviceName,
          servicePrice,
          serviceProviderId,
          paymentMethod
          
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findMyOrders(id) {
    return axios
      .get(CUST_ORDER + `findOrders/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findCustomerById(id) {
    return axios
      .get(`http://localhost:8080/customer/account/findCustById/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  findAllCustomers() {
    return axios
      .get(`http://localhost:8080/customer/account/findAll`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

 /* deleteCustomer() {
    return axios
      .delete(`http://localhost:8080/customer/account/deleteCustomer`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }*/

  deleteCustomer(id) {
    return axios
      .delete(ACC_URL + `deleteCustomer/${id}`, {
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

  updateCustomer(
    id,
    firstname,
    lastname,
    email,
    mobile,
    status,
   
  ) {
    return axios
      .put(
        ACC_URL + `updateCustomer/${id}`,
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

}


export default new CustomerService();
