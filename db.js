/*database info  related to schemas*/
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://admin:97rC6svSi9ly08dF@cluster0.iqubwzi.mongodb.net/")
  .then(() => console.log("Database connection accepted"));
const UserInfo = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    unique: true,
    maxLength: 50,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
});
const User = mongoose.model("User", UserInfo);

module.exports = User;
