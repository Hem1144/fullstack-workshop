require("dotenv").config();

const url = process.env.MONGODB;
const PORT=process.env.PORT

module.exports = { url,PORT };
