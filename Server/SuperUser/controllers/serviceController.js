const ServiceModel = require("../model/serviceModel");


exports.rateProduct= async (req,res)=>{
  try {
    const { userId,serviceProviderId,rating} = req.body;
    


    let product = await ServiceModel.findById(serviceProviderId);

    for (let i = 0; i < product.rating.length; i++) {
      if (product.rating[i].userId == userId) {
        product.rating.splice(i, 1);
        break;
      }
    }
    // console.log(req.user._id)

    

    const ratingSchema = {
      userId,
      rating,
     
    };

    product.rating.push(ratingSchema);
    product = await product.save();
    
    let average = 0
    for (let i = 0; i < product.rating.length; i++) {  // ya is lya ha taka koi 1 user 2 bari na rate kar saka.agr kara ga bhi to second rating sa first wali replace ho jai gi.
      
      average=average+product.rating[i].rating;
     
    
     
    }
    // console.log(average);
    average = average/product.rating.length;
    console.log(average);
  
    product.aver=average.toFixed(2);
    product = await product.save();

    
  
    

    
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addService = (req, res) => {
  ServiceModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response) {
        return res.status(409).json({
          message: "Entered Service Name is Already Exist",
        });
      } else {
        const service = new ServiceModel({
          serviceType: req.body.serviceType,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          timeRequired: req.body.timeRequired,
          where: req.body.where,
          serviceProviderId: req.body.serviceProviderId
        });
        service.save().then((response) => {
          console.log("Service Added: " + response);
          res.status(201).json({
            message: "Service Added Successfully",
          });
        });
      }
    })
    .catch((err) => {
      console.log("Add Service Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findAll = (req, res) => {
  ServiceModel.find({serviceProviderId: req.params.serviceProviderId})
    .select("-__v")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Services Available at this Time",
        });
      } else {
        res.status(200).json({
          service: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findAllServicesForCustomer = (req, res) => {
  ServiceModel.find()
    .select("-__v")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Services Available at this Time",
        });
      } else {
        res.status(200).json({
          service: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};


exports.updateService = (req, res) => {
  const id = req.params.serviceId;
  ServiceModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Updated Service Successfully: " + response);
      res.status(200).json({
        message: " Service Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Serivce Update error: " + err);
      res.status(500).json({ "Serivce Update error ": err });
    });
};

exports.deleteService = (req, res) => {
  const id = req.params.serviceId;
  ServiceModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: "Service Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Service Delete Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findByServiceId = (req, res) => {
  ServiceModel.findOne({ _id: req.params.serviceId })
    .exec()
    .then((response) => {
      if (response == null) {
        return res.status(404).json({
          message: "This Service is Not available",
        });
      } else {
        return res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log("Find By Service Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
