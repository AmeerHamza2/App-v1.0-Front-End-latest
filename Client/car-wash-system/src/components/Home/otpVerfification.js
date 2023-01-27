import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/customer/authentication/auth_service";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import "../Home/Login.css"
import { useParams } from 'react-router-dom';
import { useSnackbar } from "notistack";


export default function ResetPasswordMember(props) {
  
  const { userId } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (values) => {
    AuthService.verifyOTP(userId,values.otp).then((response) => {
      console.log(response);

      console.log(userId);
      console.log(values.otp);
      
      props.history.push("/login");
    })
    
  };
  return (
    <Container maxWidth="xs">
     
      <div className="login__form">
      <h1> OTP Verification!!</h1>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="otp"
            type="password"
            name="otp"
            inputRef={register({
              required: "otp is Required",
            })}
          />
          {errors.password && (
            <span className="span">{errors.password.message}</span>
          )}

          <Button className="login__button" type="submit" block color="primary">
            Verify OTP
          </Button>
          
        </form>
      </div>
    </Container>
  );
}
