"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _task = _interopRequireDefault(require("./routes/task.routes"));

// (SIN BABEL)const express = require("express"); // se necesita ejecutar por que devuelve un objeto
// con babel
var app = (0, _express["default"])(); //Settings

app.set("port", process.env.PORT || 3000); // Middelwares
//const corsOptions ={ origin: 'http://localhost:3000'}

app.use((0, _cors["default"])({//  origin: 'http://localhost:3000' // esta direccion tiene permitido utilizarla
  //### SI ESTA VACIA, CUALQUIERA LA PUEDE UTILIZAR (SIN LLAVES)
}));
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
})); // Ayuda a entender las peticiones que vienen de HTML
//Routes

app.get("/", function (req, res) {
  res.json({
    message: "Welcome!"
  });
});
app.use("/api/tasks", _task["default"]);
var _default = app;
exports["default"] = _default;