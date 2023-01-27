import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/customer/authentication/auth_service";

function Register(props) {

  const [password, setPassword] = useState();
  const [cPassword, setcPassword] = useState();
  
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
   if(password == cPassword)
    { AuthService.register(
    values.firstname,
    values.lastname,
    values.email,
    values.password
  ).then((response) => {
    console.log(response.userId)
   props.history.push("/otpVerification/"+response.userId);
  // props.history.push("/login");
  });
}
else{
  window.alert("Passwords Don't Match!")
}
}
  return (
    <Container maxWidth="xs">
      <div className="login__form">
        <h1>CUSTOMER REGISTER</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="First Name"
            placeholder="Enter Your First Name"
            type="firstname"
            name="firstname"
            inputRef={register({
              required: "First Name is Required",
            })}
          />
          {errors.name && <span className="span">{errors.name.message}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Last Name"
            placeholder="Enter Your Last Name"
            type="lastname"
            name="lastname"
            inputRef={register({
              required: "Last Name is Required",
            })}
          />
          {errors.name && <span className="span">{errors.name.message}</span>}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            inputRef={register({
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span className="span">{errors.email.message}</span>}
          <TextField
            id = "password"
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            inputRef={register({
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Minimum length of 6 is required",
              },
            })}
            onChange = {() => {
              setPassword(document.getElementById("password").value)
            }}
          />
          {errors.password && (
            <span className="span">{errors.password.message}</span>
          )}

<TextField
            id="confirmPassword"
            variant="outlined"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            placeholder="Enter Password"
            inputRef={register({
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Minimum length of 6 is required",
              },
            })}
            onChange = {() => {
              setcPassword(document.getElementById("confirmPassword").value)
            }}
          />
          {errors.password && (
            <span className="span">{"Confirm " + errors.password.message}</span>
          )}

          <Button className="login__button" type="submit" block color="primary">
            Sign Up
          </Button>
          <Grid className="login__grid" container>
            <Grid item>
              <Link className="link" to="/login">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;
