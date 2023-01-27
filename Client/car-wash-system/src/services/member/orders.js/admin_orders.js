import authHeader from "../auth_header";
import axios from "axios";

const ORDER_URL = "http://localhost:8088/admin/order/";
const COMPLTED_ORDERS_URL = "http://localhost:8030/order/";

class AdminOrders {
  findPlacedOrders(serviceProviderId) {
    return axios
      .get(ORDER_URL + `findPlacedOrder/${serviceProviderId}`, { headers: authHeader() })
      .then((res) => {
        console.log(res.data);
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  assignOrder(orderId, mechanicId) {
    return axios
      .put(
        ORDER_URL + `updateOrder/${orderId}`,
        {
          mechanicId,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findCompletedOrders(serviceProviderId) {
    return axios
      .get(COMPLTED_ORDERS_URL + `findCompltedOrders/${serviceProviderId}`)
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new AdminOrders();
