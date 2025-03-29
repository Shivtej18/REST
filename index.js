const express =require('express');
const { userInfo } = require("os");
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4(); //create random id

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies try these debugging by replacing with set by use
app.use(express.static(path.join(__dirname, 'public')));      //very IMP to use this to access the css file
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [
    {   
        id : uuidv4(),
        username: "Shivtej",
        Content: "Keep hopes",
    },
    {
        id : uuidv4(),
        username: "Ketan",
        Content: "Better than yestarday ",
    },
    {   
        id : uuidv4(),
        username: "shraddha",
        Content: "Keep smiling",
    }
];

app.get('/posts', (req, res) => {
  res.render("index.ejs", {posts});
});

app.get('/posts/new',(req ,res)=>{  //form to create new post
    res.render("new.ejs");
});

app.post("/posts", (req ,res)=>{        //post request to create new post. using post method & action is /posts i.e. path given in form
   let { username , Content} = req.body;
   console.log(username, Content);
   posts.push({ username , Content});
    res.redirect("/posts");
});

app.get('/posts/:id',(req,res)=>{
    let {id}=  req.params;
    console.log("Requested ID:", id);                       //debugging
    console.log("Available IDs:", posts.map(p => p.id));    //debugging ..there was issue with id log was undefined..prblm solved
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});     //passing post details to ejs by writting {post}
});

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newcontent= req.body.Content;
    let post = posts.find((p)=>id===p.id);
    post.Content = newcontent;
    res.redirect("/posts");
 
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=  req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});  
    
});

app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts = posts.filter((p)=>id !==p.id); //The filter method is a JS array method that creates a new array containing only the elements that satisfy the provided condition. 
    res.redirect("/posts");
})
 
app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
  });
