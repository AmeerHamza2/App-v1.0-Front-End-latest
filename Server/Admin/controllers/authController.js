const Member = require("../model/memberModel");

const userOtpVerification = require("../model/userVerificationModel");
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
              verify: user.verify
              
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

// Send OTP Function
const SendOtpVerificationEmail =  async ({ _id, email }, res) => {
  try {
    // Generated OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    // Mail Options
 /*   const mailOptions = {
      from: "otp.pethub@zohomail.com",
      to: email,
      subject: "Verify your Email",
      text: "OTP Verification Email",
      html: `
      <h2>Hello and Welcome to <span style="color:#e92e4a;">pethub.com</span></h2>
      <p>Your OTP verification code is <span style="color:#e92e4a; font-size:20px;">${otp}</span></p>.
      <p>Enter this code in our website or mobile app to activate your account.</p>
      <br/>
      <p>If you have any questions, send us an email <span style="color:blue;">support.pethub@zohomail.com</span>.</p>
      <br/>
      <p>We’re glad you’re here!</p>
      <p style="color:#e92e4a;">The PETHUB team</p>`,
    };*/
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

    //hash the OTP
    const saltRounds = 10;

    // generating salt
    const salt = bcrypt.genSaltSync(saltRounds);

    // getting Hashed OTP
    const hashedOTP = bcrypt.hashSync(otp, salt);

    //OTP Verification DB object
    const newOtpVerfication = new userOtpVerification({
      userID: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });
    await newOtpVerfication.save();
    transporter.sendMail(mailOptions, (err, info) => {
      console.log(err);
      if (err) {
        User.findByIdAndDelete({ _id: _id })
          .then(() => {
            return res.send({
              status: "failed",
              message: "Not able to send OTP" + err.message,
            });
          })
          .catch((err) => {
            return res.send({
              status: "failed",
              message: "Server Error" + err.message,
            });
          });
      } else {
        return res.send({
          status: "pending",
          message: "Verification OTP email sent.",
          data: {
            userId: _id,
            email,
          },
        });
      }
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: "error message",
    });
  }
};

exports.register = (req, res, next) => {
  // Getting all required data from request body
  var { firstname, lastname,mobile, email, password } = req.body;
  // Generating Salt using genSaltSync function with 10 rounds
  const salt = bcrypt.genSaltSync(10);
  // Check if email already exist in DB
  try {
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        res.json({ status: "failed", message: "User Already Exist" });
      } else if (err) {
        res.json({ status: "failed", message: "Server Error" });
      } else {
        // Creating a user object to save in database
        const member= new Member({
          name: firstName + " " + lastName,
          email,
          password,
          Image: "https://i.ibb.co/Lk9vMV2/newUser.png",

          _id: new mongoose.Types.ObjectId(),
          firstname,
          lastname,
          password,
          mobile,
          email,
          role,
        });
        // Hashing users password
        bcrypt.hash(member.password, salt, null, async (err, hash) => {
          if (err) {
            throw Error(err.message);
          }
          // Storing HASH Password in user object
          member.password = hash;
          // Storing user in our Database
          await user
            .save()
            .then((result) => {
              SendOtpVerificationEmail(result, res);
            })
            .catch(() => {
              res.json({ status: "failed", message: "Unable to Registered" });
            });
        });
      }
    });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
/*  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.mobile) {
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
            
            const member = new Member({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              password: hash,
              mobile: req.body.mobile,
              email: req.body.email,
              role:req.body.role,
            });
            member
              .save()
              .then((result) => {
                 
              SendOtpVerificationEmail(result._id, res.email);
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
    });*/
};


// Verify OTP route
exports.verifyOTP= async (req,res,next)=>{
//router.post("/verifyOTP", async (req, res) => {
  try {
    // Get data from Request body
    const { userID, otp } = req.body;
    // Check OTP Details
    if (!userID || !otp) {
      throw Error("Empty otp Details are not allowed");
    } else {
      // Find OTP
      const userVerificationRecords = await userOtpVerification.find({
        userID,
      });
      if (userVerificationRecords.length <= 0) {
        res.send({
          status: "failed",
          message:
            "Account record doesn't exist or has been verified already. Please Signup or Login.",
        });
      } else {
        const { expiredAt } = userVerificationRecords[0];
        const hashedOTP = userVerificationRecords[0].otp;
        // Check if Expired
        if (expiredAt < Date.now()) {
          await userOtpVerification.deleteMany({ userID });
          res.send({
            status: "failed",
            message: "Code has Expired. Please request again.",
          });
        } else {
          // Check OTP
          const validotp = bcrypt.compareSync(otp, hashedOTP);
          if (!validotp) {
            res.send({
              status: "failed",
              message: "Invalid OTP please check your Email.",
            });
          } else {
            // Update User Status
            await User.findByIdAndUpdate(
              { _id: userID },
              { verified: true }
            ).then(() => {
              userOtpVerification.deleteMany({ userID }).then(() => {
                res.json({
                  status: "success",
                  message: "User Email Verified successfully.",
                });
              });
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "failed",
      message: error.message,
    });
  }
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
