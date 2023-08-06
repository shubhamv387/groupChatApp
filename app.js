const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(
    `<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST"><input type="text" id="username" name="username" /><br><input type= "submit" value='LOG IN' /><form>`
  );
});

app.get("/", (req, res, next) => {
  //console.log(req.body);

  fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(
      `${data}<br><form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method = "POST"><input type="hidden" name="username" id="username"><input type="text" name="message" /><br><input type= "submit" value='SEND' /><form>`
    );
  });
});

app.post("/", (req, res, next) => {
  //   console.log(req.body.username, req.body.message);
  fs.appendFile(
    "message.txt",
    `${req.body.username}: ${
      req.body.message == undefined ? "Hello" : req.body.message
    } `,
    (err) => {
      if (err) console.log(err);
    }
  );
  res.redirect("/");
});

app.use((req, res, next) => {
  res.send("<h1>Page not Found</h1>");
});

app.listen(3000);
