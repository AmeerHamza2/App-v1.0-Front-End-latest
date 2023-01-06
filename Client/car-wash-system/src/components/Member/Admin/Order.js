import React, { useState, useEffect } from "react";
import AdminOrders from "../../../services/member/orders.js/admin_orders";
import MechanicController from "../../../services/member/Mechanic/Mechanic_Services";
import "./CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import AuthService from "../../../services/member/auth_service"
import {useMemo} from 'react'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [mechanics, setMechanics] = useState();
  const [completedOrders, setCompletedOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const serviceProvider = AuthService.getAdmin();
  // A function to extract the id and name of mechanics
  function createMechanic(item) {
    const id = [item._id];
    return { [id]: item.firstname };
  }
  
  console.log(serviceProvider.userId)

  const getAvailableMechanics = () => {
    MechanicController.findAvailable(serviceProvider.userId)
      .then((response) => {
        setMechanics(response.map(createMechanic));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPlacedOrders = () => {
    AdminOrders.findPlacedOrders(serviceProvider.userId)
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompletedOrders = () => {
    AdminOrders.findCompletedOrders(serviceProvider.userId)
      .then((res) => {
        setCompletedOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlacedOrders();
    getCompletedOrders();
    getAvailableMechanics();
  }, []);

  var dynamicMechanicsLookUp = {
    "6385b81587098a69ec40b5c1": "Usman",
    "6385b84487098a69ec40b5c8": "Abdul Wasey",
    "6385b90587098a69ec40b5da": "Asad",
    "6385b90587098a69ec40b5daxx": "Asad AkrM",
  
  };
  console.log(dynamicMechanicsLookUp);
   var mechs = {...mechanics}
  var newMechs = []
  for(let i in mechs){
    
    console.log(Object.keys(mechs[i])[0])
    newMechs[Object.keys(mechs[i])[0]] = Object.values(mechs[i])[0]
    
  }

    console.log(dynamicMechanicsLookUp)
  newMechs = {...newMechs}
  console.log(typeof(newMechs))


  // const _mechs = Object.assign({}, newMechs)

  // console.log(_mechs);

  const [columns, setColumns] = useState([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "firstName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Status", field: "status", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Assign Mechanic",
      field: "mechanicId",
      lookup: dynamicMechanicsLookUp
    },
  ]);

  const columnss = React.useMemo(() => ([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "firstName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Status", field: "status", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Assign Mechanic",
      field: "mechanicId",
      lookup: newMechs
    },
  ]), [newMechs]);

  const [column, setColumn] = useState([
    { title: "OrderId", field: "_id" },
    { title: "First Name", field: "firstName" },
    { title: "Car Name", field: "carName" },
    { title: "Car Number", field: "carNumber" },
    { title: "Address", field: "custAddress" },
    { title: "Service Name", field: "serviceName" },
    { title: "Status", field: "status" },
    { title: "Price", field: "servicePrice" },
    { title: "Assigned Mechanic", field: "mechanicId" },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //console.log(oldData)
    let errorList = [];
    if (errorList.length < 1) {
      AdminOrders.assignOrder(newData._id, newData.mechanicId)
        .then((res) => {
          const dataUpdate = [...orders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          console.log(newData)
          setOrders([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          enqueueSnackbar(res, {
            variant: "success",
          });
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
  const [display, setdisplay] = useState(false);
  const openTable = () => {
    setdisplay(true);
  };

  const closeTable = () => {
    setdisplay(false);
  };
  return (
    <div className="cars_container">
      <br />

      <button onClick={openTable}>See Completed Orders</button>
      <br />
      {orders ? (
        <MaterialTable
          title="CURRENT ORDERS DATA"
          columns={columnss}
          data={orders}
          editable={{
            onRowUpdate: (newData, oldData) =>
            
            new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }).then(console.log(newData)),
              
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            exportButton: true,
          }}
        />
      ) : (
        <div>
          <br />
          <h2>NO CURRENT ORDERS RIGHT NOW</h2>
        </div>
      )}

      <br />
      <br />
      <br />

      {display ? (
        <div>
          <h1>COMPLETED ORDERS</h1>
          <MaterialTable
            title="CURRENT ORDERS DATA"
            columns={column}
            data={completedOrders}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                color: "#FFF",
              },
              exportButton: true,
            }}
          />
          <br />
          <button onClick={closeTable}>Close Table</button>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

export default Orders;
