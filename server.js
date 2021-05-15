//require express
const express = require("express");
//require API routes from routes directory
const routes = require("./controllers");
//import sequelize for mysql queries
const sequelize = require("./config/connection");
//import path for file structure management
const path = require("path");
//import handlebars express
const exphbs = require("express-handlebars");
//import express-session as session
const session = require("express-session");
//import connect-session-sequelize as SequelizeStore
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//import helpers
const helpers = require("./utils/helpers");

//instance of express named app
const app = express();
//instance of handlebars express
const hbs = exphbs.create({ helpers });

//express calling handlebars engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//set port
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//express using path middleware to serve up static files in public folder
app.use(express.static(path.join(__dirname, "public")));

//express using json file format for request and response
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes from routes folder
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
