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
        username: "Shivtej",
        Content: "Keep hopes",
    },
    {
        username: "Ketan",
        Content: "Hello ",
    },
    {
        username: "shraddha",
        Content: "bye"
    }
];

app.get('/posts', (req, res) => {
  res.render("index.ejs", {posts});
});

app.listen(port, () => {  
    console.log(`Server is running on port ${port}`);
  });
  