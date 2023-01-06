import axios from "axios";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8088/admin/car-services/";
const API_URL1 = "http://localhost:4000/superUser/blog/";

class Package {
  getAllServices(serviceProviderId) {
    return axios
      .get(API_URL + `findAll/${serviceProviderId}`)
      .then((response) => {
        return response.data.service;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllServicesForCustomer() {
    return axios
      .get(API_URL + `findAllServicesForCustomer/`)
      .then((response) => {
        return response.data.service;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addService(serviceType, name, price, description, timeRequired, where, serviceProviderId) {
    return axios
      .post(
        API_URL + "addService",
        { serviceType, name, price, description, timeRequired, where, serviceProviderId },
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

  updateService(
    id,
    serviceType,
    name,
    price,
    description,
    timeRequired,
    where
  ) {
    return axios
      .patch(
        API_URL + `updateService/${id}`,
        { id, serviceType, name, price, description, timeRequired, where },
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

  deleteService(id) {
    return axios
      .delete(API_URL + `deleteService/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findServiceById(id) {
    return axios
      .get(API_URL + `findById/${id}`)
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  findByServiceProviderId(serviceProviderId) {
    return axios
      .get(API_URL + `findByServiceProviderId/${serviceProviderId}`)
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // BLOGS PACKAGE SERVICES

  getAllBlogs() {
    return axios
      .get(API_URL1 + `findAll`)
      .then((response) => {
        console.log(response)
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addBlog(title, body, author,formData) {
    return axios
      .post(
        API_URL1 + "addBlog",
        { title, body, author,formData  },
        {
         // headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteBlog(id) {
    return axios
      .delete(API_URL1 + `deleteblog/${id}`, {
       // headers: authHeader(),
      })
      .then((res) => {
        return res.data.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateBlog(
    id,
    title,
    body,
    author,
   
  ) {
    return axios
      .put(
        API_URL1 + `updateBlog/${id}`,
        { id,title, body,author },
        {
          //headers: authHeader(),
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

export default new Package();
