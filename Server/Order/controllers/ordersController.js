const Order = require("../model/orderModel");


var nodemailer = require('nodemailer');


//TO place an Order
exports.addOrder = (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    email:req.body.email,
    carName: req.body.carName,
    carNumber: req.body.carNumber,
    custAddress: req.body.custAddress,
    serviceName: req.body.serviceName,
    servicePrice: req.body.servicePrice,
    serviceProviderId: req.body.serviceProviderId
  });
  let transporter = nodemailer.createTransport({
   
    host: 'smtp.office365.com', // Office 365 server
         port: 587,     // secure SMTP
         secure: false,
         requireTLS: true,
     auth: {
       user: 'carsaz37@outlook.com',
       pass: 'carsaz654321'
       
       
     },
     tls: {
       ciphers: 'SSLv3'
   }
   });
  
  const mailOptions = {
     from:'carsaz37@outlook.com', // sender address
     to: req.body.email,
     subject: 'Your Oder has been Placed Successfully!!!!',// Subject line
     text: ' your order has been placed Successfully!!.\n',
     html : 'A Mechanic will soon be Assign to You.'
 // html : 'To reset your password, click this <a href="' + '"><span>link</span></a>.<br>This is a <b>test</b> email.'
    };
  order
    .save()
    .then((result) => {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        return res.json({message:'Email has been sent'});
        }
      });
      console.log("Order Placed: " + result);
      res.status(201).json({
        message: "Thank you for your order.",
        result,
      });
     
    })
    .catch((err) => {
      console.log("Placing Order Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Find Completed Orders
exports.findCompltedOrders = (req, res) => {
  Order.find({ status: "COMPLETED", serviceProviderId: req.params.serviceProviderId })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Completed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// "Request Placed",
//           "Request Cancel",
//           "Request in Process",
//           "Request Accepted",
//           "Request Rejected",
//           "Request Completed",
