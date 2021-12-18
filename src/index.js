import app from "./app";
import "./database";

import "dotenv";

app.listen(app.get("port"));
console.log("Server on por", 3000);
