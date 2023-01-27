import React, { useState, useEffect } from "react";
import AuthServices from "../../../services/member/auth_service";
import MechanicServices from "../../../services/member/Mechanic/Mechanic_Services";
import PackageServices from "../../../services/member/package/package_services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import axios, * as others from 'axios';

function Mechanic() {
  const [message, setMessage] = useState("");


  const [errorMessages, setErrorMessages] = useState([]);
  const [iserror, setIserror] = useState(false);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [image, setFileName] = useState(null);
  const [verify, setVerify] = useState("");

  
  const [mechanic, setMechanic] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [showMechanic, setShowMechanic] = useState(0);

  const [zoom, setZoom] = React.useState(false);
  const serviceProvider = AuthServices.getAdmin();
 


  const getAllServiceProviders = () => {
    MechanicServices.findAllServiceProviders()
      .then((response) => {
        setMechanic(response);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openForm = () => {
  
    setdisplay(true);
    console.log(showMechanic);
  };
  useEffect(() => {
  
   // if(showMechanic){
    getAllServiceProviders();
  //  }
    
  },[]);

  

  const { handleSubmit, register, errors } = useForm({
    mode: "onBlur",
  });

  const [display, setdisplay] = useState(false);
  
  const showMechanics = () => {
  
    setShowMechanic(true);
  };

  const closeForm = () => {
    setdisplay(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const onChangeFile=e=>{
    setFileName(e.target.files[0]);
  }

  const onSubmit=(e)=>{
   
    e.preventDefault();
   
  console.log(image)
  if(!image){
    alert("add image");
    return false;
  }
  const formData=new FormData();
  formData.append("firstname",firstname); 
  formData.append("lastname",lastname); 
  formData.append("email",email); 
  formData.append("password",password); 
  formData.append("mobile",mobile); 
 
 
  formData.append("image",image);  // "testImage",the name must be same that is in the backend.
  console.log(formData)

  
    
  axios.post("http://localhost:4000/admin/auth/register/",formData,)
  .then((res) => {
    enqueueSnackbar(res, {
      variant: "success",
    });
  }).then(window.location.reload())
  .catch((err) => {
    console.log(err);
  });
 /* AuthServices.registerMechanic(
    formData,
    serviceProvider.userId
   
  )
    .then((res) => {
      enqueueSnackbar(res, {
        variant: "success",
      });
    })
    .catch((err) => {
      console.log(err);
    });*/
            }

 /* const onSubmit = (values) => {
    AuthServices.registerMechanic(
      values.firstname,
      values.lastname,
      values.email,
      values.password,
      values.mobile,
      values.role,
      serviceProvider.userId
     
    )
      .then((res) => {
        enqueueSnackbar(res, {
          variant: "success",
        });
      }).then(window.location.reload())
      .catch((err) => {
        console.log(err);
      });
  };*/

  
  const dynamicTypeLookUp = {
    1: "true",
    2: "false",
  };

  const [columns, setColumns] = useState([
    
    { title: "ID", field: "_id" },
    { title: "Firstname", field: "firstname" },
    { title: "Lastname", field: "lastname" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "mobile" },
    { title: "Status", field: "status" },
    //{ title: 'Image', field: 'image', render: item => <img src={item.image} alt="" border="3" height="100" width="100" />},
  
    {title: 'images', field: 'image',
      render: rowData =>
      <img src={rowData.image} alt={rowData.description} style={{ width: 100 }} />
     /* <div
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      style={{
        width: 200,
        height: 200,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <img
        src={rowData.image}
        alt=""
        style={{
          width: zoom ? 400 : 200,
          height: zoom ? 400 : 200,
          position: 'absolute',
          transform: `translate(${zoom ? -100 : 0}%, ${zoom ? -100 : 0}%)`
        }}
      />
    </div>*/
  },
  {title: ' Current Verification Status', field: 'verify'},
  {title: 'Manage Verification Status', field: 'verify', lookup: dynamicTypeLookUp},

  ]);
  
  const handleRowDelete = (oldData, resolve) => {
    MechanicServices.deleteServiceProviderAccount(oldData._id)
      .then((res) => {
        const dataDelete = [...mechanic];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setMechanic([...dataDelete]);
        resolve();
        enqueueSnackbar(res, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar("Delete failed! Server error", {
          variant: "error",
        });
        resolve();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      MechanicServices.updateServiceProvider(
        newData._id,
        newData.firstname,
        newData.lastname,
        newData.email,
        newData.mobile,
        newData.status,
        newData.verify
      
      )
        .then((res) => {
          const dataUpdate = [...mechanic];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setMechanic([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        /*  enqueueSnackbar(res, {
            variant: "success",
          });*/
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  console.log(mechanic)
  return (
    <div className="cars_container">
      <h3>List of All Service Providers</h3>
      <br />

      <button onClick={openForm}>Add Service Provider</button>
      <button onClick={showMechanics}>Show Mechanic</button>
      
      <br />
      <MaterialTable
        title="Service Providers Data"
        columns={columns}
        data={mechanic}
        editable={{
          onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            handleRowUpdate(newData, oldData, resolve);
          }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
        options={{
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
      />

      {/* {display ? (
        <Container maxWidth="xs">
          <div className="login__form">
            <h4>Create Mechanic Account</h4>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="firstname"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    label="first name"
                    inputRef={register({
                      required: "Name is Required",
                    })}
                  />
                  {errors.name && <span>{errors.firstname.message}</span>}
                  
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="lastname"
                    name="lastname"
                    variant="outlined"
                    fullWidth
                    label="last name"
                    inputRef={register({
                      required: "Name is Required",
                    })}
                  />
                  {errors.name && <span>{errors.firstname.message}</span>}
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    inputRef={register({
                      required: "Password is Required",
                    })}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    inputRef={register({
                      required: "Mobile is Required",
                    })}
                  />
                  {errors.mobile && <span>{errors.mobile.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="role"
                    name="role"
                    inputRef={register({
                      required: "Mobile is Required",
                    })}
                  />
                  {errors.mobile && <span>{errors.mobile.message}</span>}
                </Grid>
                
                
              </Grid>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login_button"
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>
          <br />
          <button onClick={closeForm}>Close Form</button>
          <br />
          <br />
          <br />
        </Container>
      ) : null} */}


         {display ? (
<Modal
        open={display}
        onClose={closeForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container maxWidth="xs">
        <div className="login__form">
            <h4>Create Mechanic Account</h4>
            <br />
            <form  onSubmit={onSubmit} encType="multipart/form-data"  >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                     autoComplete="firstname"
                     name="firstname"
                     variant="outlined"
                     fullWidth
                     label="first name"
                     value={firstname}
                     onChange={(e) => {
                       setFirstName(e.target.value);
                     }}
                     inputRef={register({
                      required: "Name is Required",
                    })}
                
                  />
           
                  
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                   autoComplete="lastname"
                   name="lastname"
                   variant="outlined"
                   fullWidth
                   label="last name"
                    value={lastname}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                
                  />
             
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                   
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
                  />
                
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    
                  />
                
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                     label="Mobile"
                     fullWidth
                     value={mobile}
                     variant="outlined"
                     onChange={(e) => {
                       setMobile(e.target.value);
                     }}
                   
                  />
                
                </Grid>
                <Grid item xs={12} sm={6}>
                 
               
               <input
               
                 type='file'
                filename="image"
/* onChange={e => {
    setProductImage(e.target.files[0])
}}*/
            onChange={onChangeFile}

/>

                </Grid>
                
                
              </Grid>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login_button"
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>
       {/*   <div className="login__form">
            <h4>Create Mechanic Account</h4>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="firstname"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    label="first name"
                    inputRef={register({
                      required: "Name is Required",
                    })}
                  />
                  {errors.name && <span>{errors.firstname.message}</span>}
                  
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="lastname"
                    name="lastname"
                    variant="outlined"
                    fullWidth
                    label="last name"
                    inputRef={register({
                      required: "Name is Required",
                    })}
                  />
                  {errors.name && <span>{errors.firstname.message}</span>}
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    inputRef={register({
                      required: "Password is Required",
                    })}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    inputRef={register({
                      required: "Mobile is Required",
                    })}
                  />
                  {errors.mobile && <span>{errors.mobile.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="role"
                    name="role"
                    inputRef={register({
                      required: "Mobile is Required",
                    })}
                  />
                  {errors.mobile && <span>{errors.mobile.message}</span>}
                </Grid>
                
                
              </Grid>
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="login_button"
              >
                CREATE ACCOUNT
              </Button>
            </form>
          </div>*/}
          <br />
          {/* <button onClick={closeForm}>Close Form</button> */}
          <br />
          <br />
          <br />
        </Container> 
        </Box>
      </Modal>
       ) : null}

    </div>
  );
}

export default Mechanic;



