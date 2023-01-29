const Member = require("../model/memberModel");
const Mechanic = require("../../Mechanic/model/mechanicModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authConfig = require("../config/authConfig");
var nodemailer = require('nodemailer');
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'do5n008aj', 
  api_key: '652113393421791', 
  api_secret: 'XKH8E9ytU54tTXPsuZPdu94HZJQ',
  secure: true
});

exports.login = (req, res, next) => {
  Member.findOne({ email: req.body.email })
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
              name: user.firstname,
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
      console.log("Login: " + err);
      res.status(500).json({
        error: err,
      });
    });
};


// exports.getServiceProvider = (req, res) => {
//   Member.find({ _id: req.body._id })
//     .exec()
//     .then((response) => {
//         if (response == null) {
//           return res.status(404).json({
//             message: "No Service Provider Found",
//           });
//         } else {
//           return res.status(200).json({
//             response,
//           });
//         }
//       })
//       .catch((err) => {
//       console.log("Error: " + err);
//       res.status(500).json({
//         Login_Error: err,
//       });
//     });
// };


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
      
        Member.findOne({resetLink}, async (err,user)=>{
        
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
  let user =  await Member.findOne({ email: req.body.email });
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
 let resetUrl = 'http' + '://' + 'localhost' + ':' + 3000 + '/ResetPasswordMember/' + token
 
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
    subject: 'reset your Application password!!!!',// Subject line
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
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Member.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Member Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const file=req.files.image;
            cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
            const member = new Member({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: hash,
              mobile: req.body.mobile,
              email: req.body.email,
              role:req.body.role,
              image:result.url
            });
            member
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
            });
          }
        });
      }
    });
};


exports.registerMechanic = (req, res, next) => {
   if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Member.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Member Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const file=req.files.image;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
            const member = new Member({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: hash,
              mobile: req.body.mobile,
              email: req.body.email,
              role:req.body.role,
              serviceProviderId: req.body.serviceProviderId,
              image:result.url
            });
            member
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
            });
          }
        });
    
      }
    });

};

/*exports.registerMechanic = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  Mechanic.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Member Already Exist",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const member = new Mechanic({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              password: hash,
              mobile: req.body.mobile,
              email: req.body.email
            });
            member
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
};*/
