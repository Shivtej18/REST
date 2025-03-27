const express =require("express");
const { userInfo } = require("os");
const app = express();
const port = 8080;
const path = require('path');

app.use(express.urlencoded({ extended: true }));    // to support URL-encoded bodies try these debugging by replacing with set by use
app.use(express.static(path.join(__dirname, 'public')));      //very IMP to use this to access the css file
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let posts = [
    {   
        id : "1a",
        username: "Shivtej",
        Content: "Keep hopes",
    },
    {
        id : "2b",
        username: "Ketan",
        Content: "Better than yestarday ",
    },
    {   
        id : "3c",
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
})

app.get('/posts/:id',(req,res)=>{
    let {id}= req.params;
    console.log(id);
    res.send("got the id")
    
})
app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
  });
  