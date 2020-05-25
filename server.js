// ENV INIT
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

// Require
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// Routers
const indexRoutes = require("./routes/index");
const chatacterRoutes = require("./routes/characters");
const moviesRoutes = require("./routes/movies");

// Initial Setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/layouts/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// DataBase Connect
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected"));

// Routes INIT
app.use("/", indexRoutes);
app.use("/characters", chatacterRoutes);
app.use("/movies", moviesRoutes);

// Server INIT
app.listen(process.env.PORT || 3000);
