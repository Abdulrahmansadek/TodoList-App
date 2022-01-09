const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add methodoverride middleware
app.use(methodOverride("_method"));

// add handlebars middleware
app.set("view engine", "handlebars");
app.engine("handlebars", engine({ defaultLayout: "main" }));

// static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/todo", require("./routes/todo"));

app.listen(PORT, () => {
  console.log(`the server running on http://localhost:${PORT}`);
});
