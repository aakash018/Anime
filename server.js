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

// Routers
const indexRoutes = require("./routes/index");
const chatacterRoutes = require("./routes/characters");

// Initial Setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", __dirname + "/layouts/layout");
app.use(expressLayouts);
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

// Server INIT
app.listen(process.env.PORT || 3000);
