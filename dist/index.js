"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

require("dotenv");

_app["default"].listen(_app["default"].get("port"));

console.log("Server on por", 3000);