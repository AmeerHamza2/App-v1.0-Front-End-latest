import React, { useEffect, useState } from "react";
import AuthService from "../../services/customer/authentication/auth_service";
import CustomerService from "../../services/customer/customer_service";
import CarService from "../../services/member/car/car_services";
import PackageService from "../../services/member/package/package_services";
import "./CSS/Order.css";
import { Card, Grid, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import StripeContainer from "./StripeContainer";
import ServiceProviderService from "../../services/member/auth_service";

function Order(props) {
  const { match, history } = props;
  const { params } = match;
  const { carId, serviceId } = params;
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);
  const [car, setCar] = useState([]);
  const [display, setdisplay] = useState(false);
  const [button, setbutton] = useState(false);
  const [buttonOne, setbuttonOne] = useState(true);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const getPackage = () => {
    PackageService.findServiceById(serviceId)
      .then((res) => {
        setService(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const closeForm = () => {
    setdisplay(false);
  };

  const openForm = () => {
    setdisplay(true);
    setbutton(true);
    setbuttonOne(false)
  };

  const handleButtonClick = () => {
    setbutton(false);
  };

  const getCar = () => {
    CarService.findCarById(carId)
      .then((res) => {
        setCar(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    console.log("Checking User");
    console.log(user);
    setUser(user);

    getCar();
    getPackage();
  }, []);

  (async () => {
    const id = await service.serviceProviderId;
    // {"metadata": "for: test.png"}
  })();

  const id = service.serviceProviderId;
  const serviceProvider = PackageService.findByServiceProviderId(id).then(
    (res) => {
      console.log(res);
    }
  );
  console.log("Printing" + serviceProvider);

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (values) => {
    CustomerService.placeOrder(
      user.userId,
      user.firstname,
      user.email,
      car.name,
      values.carNumber,
      values.custAddress,
      service.name,
      service.price,

      service.serviceProviderId,
      "Cash"
    )
      .then((response) => {
        enqueueSnackbar(response, {
          variant: "success",
        });
        props.history.push("/cust_home");
        //.then(window.location.reload())
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitOnline = (values) => {
    CustomerService.placeOrder(
      user.userId,
      user.firstname,
      user.email,
      car.name,
      values.carNumber,
      values.custAddress,
      service.name,
      service.price,
      service.serviceProviderId,
      "Online"
    )
      .then((response) => {
        enqueueSnackbar(response, {
          variant: "success",
        });
        props.history.push("/cust_home");
        //.then(window.location.reload())
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1 className="summary_title">ORDER SUMMARY</h1>
      <Card className="booking_card">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p className="title_subHeading">PERSONAL DETAILS</p>
            <h4>Email Id: {user.email}</h4>
            <h4>Name: {user.firstname}</h4>
            <form onSubmit={button ? handleSubmit(onSubmitOnline): handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    color="primary"
                    variant="outlined"
                    label="Vehicle Number"
                    name="carNumber"
                    margin="normal"
                    inputRef={register({
                      required: "Number is Required",
                    })}
                  />
                  {errors.carNumber && (
                    <span className="span">{errors.carNumber.message}</span>
                  )}
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <TextField
                    color="primary"
                    variant="outlined"
                    label="Address"
                    multiline
                    name="custAddress"
                    margin="normal"
                    inputRef={register({
                      required: "Address is Required",
                    })}
                  />
                  {errors.custAddress && (
                    <span className="span">{errors.custAddress.message}</span>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className=""
                onClick={closeForm}
              >
                PLACE ORDER (CASH)
              </Button>
              <br />
              <br />
              { buttonOne? (<Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className=""
              onClick={openForm}
            >
              PLACE ORDER (ONLINE)
            </Button> ) : null}

            {button ? (
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className=""
               
              >
                Checkout
              </Button>
            ): null}
            </form>

            <div style={{ marginTop: "20px" }}>
              {display ? (
                <Modal
                  open={display}
                  onClose={closeForm}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <StripeContainer onSubmit={onSubmit} price={service.price} />
                </Modal>
              ) : null}
            </div>

            
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <p className="title_subHeading">SERVICE DETAILS</p>
            <h3>Service Name: {service.name}</h3>
            <h3>Total Price: {service.price}</h3>
            <h3>Time Required: {service.timeRequired}</h3>
            <h3>Selected Car: {car.name}</h3>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default Order;
