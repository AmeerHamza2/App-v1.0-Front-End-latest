const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const blogController = require("../controllers/blogController");

//Add Blog
router.post(
  "/addBlog",
 // [checkAuth.verifyToken, checkAuth.isAdmin],
  blogController.addBlog
);

// Find All Blogs
router.get("/findAll/", blogController.findAll);


//FInd Blog By It's ID
router.get("/findByBlog/:id", blogController.findByBlog);

//Update Blog Details
router.put(
  "/updateBlog/:id",
 // [checkAuth.verifyToken, checkAuth.isAdmin],
  blogController.updateBlog
);

router.delete(
  "/deleteblog/:id",
 // [checkAuth.verifyToken, checkAuth.isAdmin],
  blogController.deleteblog
);
module.exports = router;
