//starting file
const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const Port = 3000;
app.listen(Port, function (err) {
  if (err) {
    console.log("Server not working");
  }
  console.log("Server listening on port", Port);
});
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/apis/site", mainRouter); //here app.use is used to route all the request starting from /apis/site to main router
