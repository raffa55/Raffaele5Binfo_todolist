const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const http = require("http");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));
const path = require('path');
app.use("/", express.static(path.join(__dirname, "public")));

let todos = [];

app.post("/todo/add", (req, res) => {
   const todo = req.body.todo;
   todo.id = "" + new Date().getTime();
   todos.push(todo);
   res.json({result: "Ok"});
});

app.get("/todo", (req, res) => {
   res.json({todos: todos});
});

app.put("/todo/complete", (req, res) => {
    const todo = req.body;
    try {
       todos = todos.map((element) => {
          if (element.id === todo.id) {
             element.completed = true;
          }
          return element;
       })
    } catch (e) {
       console.log(e);
    }
    res.json({result: "Ok"});
 });


 app.delete("/todo/:id", (req, res) => {
    todos = todos.filter((element) => element.id !== req.params.id);
    res.json({result: "Ok"});  
 })

const server = http.createServer(app);

server.listen(5500, () => {
  console.log("- server running");
});

const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage}).single('file');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        
    console.log(req.file.filename);    
    res.json({url: "./files/" + req.file.filename});    
  })
});

const server = http.createServer(app);
server.listen(5600, () => {
  console.log("- server running");
});