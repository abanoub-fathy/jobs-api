const { connect } = require("mongoose");

const connectToDB = async () => {
  await connect(process.env.DB_URI);
};

module.exports = connectToDB;
