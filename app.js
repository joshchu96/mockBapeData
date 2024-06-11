const express = require("express");
const app = express();
const productRoutes = require("./products");
const customersRoutes = require("./customers");
const expressError = require("./expressError");

app.use(express.json()); //middleware parser

app.use("/bape.com/products", productRoutes);

app.use("/bape.com/customers", customersRoutes);

app.use((err, req, res, next) => {
  console.log("middleware error handling");
  const errorStatus = err.statusCode;
  const errMessage = err.message;
  res.status(errorStatus).json({ error: errMessage });
});

module.exports = app;
