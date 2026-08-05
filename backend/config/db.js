const mongoose = require("mongoose");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas Connected Successfully");
    console.log(conn.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;