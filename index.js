//starting file
const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const Port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/apis/site", mainRouter);
app.listen(Port, function (err) {
  if (err) {
    console.log("Server not working");
  }
  console.log("Server listening on port", Port);
});
