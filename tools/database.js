const mongoose = require("mongoose");
const config = require('../config/config.json');
const client = require("..");
const mongoosedb = config.mongooseConnectionString;

mongoose.connect("mongooseConnectionString", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("[✅ DataBase] Connected!");
});
module.exports = mongoose;
