const Post = require("../model/blogModel");
const serviceModel = require("../model/serviceModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'do5n008aj', 
  api_key: '652113393421791', 
  api_secret: 'XKH8E9ytU54tTXPsuZPdu94HZJQ',
  secure: true
});
//Add Blog
exports.addBlog = (req, res) => {
 const file=req.files.image;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
  
console.log(result);
 const { title, body, author, } = req.body;
 // const date = Date.parse(req.body.date);

  //const comments = [];

  //Create a new Post and save it to DB
  const newPost = new Post({
      title,
      body,
      author,
      image:result.url
      //date,
      //comments,
  });

  // Save the new post
  newPost
      .save()
      .then(() => res.json("Post Added!"))
      .catch((err) => res.status(400).json("Error: " + err));

});
/*const file=req.files.photo;
const { secure_url } =  cloudinary.uploader.upload(file.tempFilePath, {
  use_filename: true,
  folder: "users",

});

return secure_url;*/

 
 
};

//// Find All Blogs
exports.findAll = (req, res) => {
  Post.find()
  .then((posts) => res.json(posts))
  .catch((err) => res.status(400).json("Error: " + err));
};

//Find Blog By ID
exports.findByBlog = (req, res) => {
  Post.findById(req.params.id)
  .then((post) => res.json(post))
  .catch((err) => res.status(400).json("Error: " + err));
};




//Update Blog Details
exports.updateBlog = (req, res) => {
  Post.findById(req.params.id)
        .then((post) => {
            post.title = req.body.title;
            post.body = req.body.body;
            post.author = req.body.author;
          //  post.date = Date.parse(req.body.date);
          //  post.comments = req.body.comments;

            post.save()
                .then(() => res.json("Post Edited"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
}

exports.deleteblog = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
        .then(() =>  {
          res.status(200).json({
            message: "Blog deleted Successfully",
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
};
