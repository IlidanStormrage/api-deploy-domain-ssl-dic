// (SIN BABEL)const express = require("express"); // se necesita ejecutar por que devuelve un objeto
import express from "express"; // con babel
import morgan from "morgan";
import cors from "cors";
import TaskRoutes from "./routes/task.routes";

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

// Middelwares
//const corsOptions ={ origin: 'http://localhost:3000'}
app.use(
  cors({
    //  origin: 'http://localhost:3000' // esta direccion tiene permitido utilizarla
    //### SI ESTA VACIA, CUALQUIERA LA PUEDE UTILIZAR (SIN LLAVES)
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Ayuda a entender las peticiones que vienen de HTML

//Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/tasks", TaskRoutes);

export default app;
