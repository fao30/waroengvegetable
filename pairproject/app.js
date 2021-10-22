const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const routers = require("./routers");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//secret untuk amanin session
app.use(
  session({
    secret: "rahasia fao ",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/", routers);

app.listen(port, () => {
  console.log(`This app is listening on port ${port}`);
});
