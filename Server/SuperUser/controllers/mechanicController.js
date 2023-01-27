const Member = require("../model/memberModel");

//FInd Available Mechanics
exports.findAvailable = (req, res) => {
  Member.find({ status: "AVAILABLE" , role: "MECHANIC"})
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Mechanics are Available",
        });
      } else {
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//FInd All Mechanics
exports.findAll = (req, res) => {
  const serviceProviderId = req.body.serviceProviderId;
  Member.find({role:"MECHANIC", serviceProviderId: req.params.serviceProviderId})
    .select("firstname lastname email mobile status")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "Add a Mechanic",
        });
      } else {
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
//FInd All Service providers
exports.findAllServiceProviders = (req, res) => {
  const serviceProviderId = req.body.serviceProviderId;
  Member.find({role:"ADMIN"})
  .select("firstname lastname email mobile status image verify" )
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "Add a Mechanic",
        });
      } else {
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
