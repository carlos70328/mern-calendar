const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//crear servidor express
const app = express();

//Base de datos
dbConnection();

app.use(cors());

//directorio publico
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.get("*", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`servidor en puerto ${process.env.PORT}`);
});
