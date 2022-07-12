const mongoose = require("mongoose");
require("dotenv").config()


const mongo_url = process.env.MONGO_URL
// const mongo_url = 'mongodb+srv://michalsagi:Ms6512864@cluster0.03bbe.mongodb.net/playlist?retryWrites=true&w=majority';
exports.connect = async () => {
  try {
    await mongoose.connect(mongo_url, { useNewUrlParser: true }, (err) => {
      if (err) {
        console.log("error:", err);
        return false;
      }
      console.log("Connection Success, State:", mongoose.connection.readyState);
    });
  } catch (error) {
    console.log("error mongoose:", error);
  }
};

// module.exports = { connect };
