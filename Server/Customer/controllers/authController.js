const User = require("../model/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authConfig = require("../config/authConfig");
var nodemailer = require('nodemailer');


exports.resetPassword= async (req,res,next)=>{
  const {resetLink,newPass}=req.body;
  //console.log(resetLink);
  if(resetLink){
    jwt.verify(resetLink, authConfig.secretKey,function(error,decodedData){
      if(error){
        return res.status(401).json({
          error:"Incorrect token or it is expired"
        })
      }
      
        User.findOne({resetLink}, async (err,user)=>{
        
              if(err || !user){
                return res.status(400).json({error:"User with this token does not exist."});
              }
          
        user.password=newPass
       
       await  user.generateHashedPassword();
        user.resetLink=''
         
              
           await  user.save((err,result)=>{
                if(err){
                  return res.status(400).json({error:"reset password error"});
                }else{
                  return res.status(200).json({message:'Your password has been changes'})
                }
              })
      })
    })
  }else{
    return res.status(401).json({error:"Authentication error!!!"});
  }

}


exports.forgotPassword= async (req,res,next)=>{
  let user =  await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  const token = jwt.sign(
    {
      userId: user._id,
    },
    authConfig.secretKey,
    {
      expiresIn: "1h",
    }
  );
 // const link='http://localhost:3000/ResetPassword/+{token}';
 let resetUrl = 'http' + '://' + 'localhost' + ':' + 3000 + '/ResetPassword/' + token
 
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
    subject: 'reset your carsaz password!!!!',// Subject line
    text: 'The link will be expired in 1 Hour.\n',
  
 html : 'To reset your password, click this <a href="' + resetUrl + '"><span>link</span></a>.<br>This is a <b>test</b> email.'
   };
  return  user.updateOne({ resetLink:token },function(err,success){
    

  if (err){
    return res.status(400).json({error:"reset password link"});
  } 
  else {
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      return res.json({message:'Email has been sent'});
      }
    });
  }



  })
}

exports.register = (req, res, next) => {
  console.log("Inside Register");

  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              role: req.body.role,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Registered Successfully",
                  user: result,
                });
              })
              .catch((err) => {
                console.log("Registration Error" + err);
                res.status(500).json({
                  Registartion_Error: err,
                });
              });
          }
        });
      }
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          } else if (response) {
            const token = jwt.sign(
              {
                userId: user._id,
              },
              authConfig.secretKey,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Authentication Successful",
              userId: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
              token: token,
            });
          } else {
            return res.status(401).json({
              message: "Authentication Failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Login Error: " + err);
      res.status(500).json({
        Login_Error: err,
      });
    });
};


