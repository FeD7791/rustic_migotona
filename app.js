const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const morgan = require("morgan");

const session = require("express-session");
const bodyParser = require("body-parser");

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //For posts in json

//Morgan
app.use(morgan("dev"));

//VIEWS
app.set("view engine", "ejs"); //Se fija ejs como el motor para las vistas
app.set("views", path.resolve(__dirname, "views")); //Se fija una ruta dinamica (con __dirname)

app.locals.nombre = "";
app.locals.categoria = "Productos";

//STATIC FILES
app.use(express.static(path.resolve(__dirname, "public")));

//Rutas de los productos
app.use("/products", require("./routes/rutas_productos"));
//Rutas de las vistas web
app.use("/", require("./routes/rutas_web"));

//404 Not Found
app.use((req, res) => {
  res.status(404);
  res.send("<h1>Error 404: Page Not Found in this Site</h1>");
});

//Listen port
app.listen(PORT, () => console.log("listening on port", PORT));
