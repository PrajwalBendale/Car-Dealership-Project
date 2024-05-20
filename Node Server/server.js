const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
//const todolistRoutes=require("./routes/todo");
const carsRoutes = require("./routes/cars");
const empRoutes = require("./routes/employees");
const salesRoutes = require("./routes/sales");
const customersRoutes = require("./routes/customers");
const custinq = require("./routes/inquiry");
const app = express();
app.use(express.static("images"));

app.use(express.json());
app.use(cors());

//app.use('/todos',todolistRoutes);
app.use("/cars", carsRoutes);
app.use("/emp", empRoutes);
app.use("/sales", salesRoutes);
app.use("/customers", customersRoutes);
app.use("/inq", custinq);
app.listen(9999, () => {
  console.log("Server Started...");
});
