import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/member/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "../Home/Login.css";
import { useSnackbar } from "notistack";
import { toast } from "react-toastify";

export default function ForgetPasswordMember(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AuthService.forgotPassword(values.email).then((response) => {
      console.log(response);
     
      props.history.push("/member_login");
      window.location.reload()
    }).then( toast.success("Login Successfully !", {
      position: toast.POSITION.TOP_CENTER,
    })).catch( toast.error("Invalid Email or Password !", {
      position: toast.POSITION.TOP_CENTER,
    }))
    
  };
  return (
    <Container maxWidth="xs">
     
      <div className="login__form">
      <h1> Forget Password</h1>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
       
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            inputRef={register({
              required: "Email is Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <span className="span">{errors.email.message}</span>}
          
          <Button className="login__button" type="submit" block color="primary">
            Reset Password
          </Button>
          
        </form>
      </div>
    </Container>
  );
}
