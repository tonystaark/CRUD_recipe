const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7yowb.mongodb.net/recipe?retryWrites=true&w=majority`;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongooseConnection = mongoose.connect(uri, config);

module.exports = mongooseConnection;
