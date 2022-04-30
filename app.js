const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

const para="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contact="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const date=require(__dirname+"/date.js");
//let post1=[];
//_________________mongodb-connection__________//
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewURLParser:true});
const postSchema={
    title:String,
    content:String,
    Date:String
}
const Post=mongoose.model("Post",postSchema);






app.get("/",function(req,res){
    Post.find({},function(err,posts){
        res.render("index",{paragraph:para,posts:posts});
    });
    
    
    
    
    
});
app.get("/about",function(req,res){
    res.render("about",{abt:about});
});
app.get("/contact",function(req,res){
    res.render("contact",{cont:contact});
});
app.get("/compose",function(req,res){
    res.render("compose");
})
app.post("/compose",function(req,res)
{
    /*let data={
        title:req.body.add,
        desc:req.body.text1
    };
    post1.push(data);*/
    const post=new Post({
        title:req.body.add,
        content:req.body.text1,
        Date:date()
    });
    post.save(function(err){
        if(!err)
        {
            res.redirect("/");
        }
    });
});
app.get("/posts/:postId",function(req,res){
    /*for(var i=0;i<post.length;i++)
    {
        if(post[i].title===req.params.postname)
        {
            res.render("post",{title:post[i].title,description:post[i].desc});
        }
    }
*/
    const requestedPostId=req.params.postId;
    Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post",{title:post.title,content:post.content,day:post.Date});
    });
 });
app.listen(3000,function(){
console.log("server started");
});
