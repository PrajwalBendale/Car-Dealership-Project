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

app.use(express.json());
//app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://dfc3-103-81-38-108.ngrok-free.app",
    ], // Allow requests from a specific origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Limit methods to specific ones
    allowedHeaders: ["Content-Type", "Authorization"], // Limit allowed headers
    credentials: true, // Allow credentials if necessary
  })
);
app.use(express.static("images"));
//app.use('/todos',todolistRoutes);
app.use("/cars", carsRoutes);
app.use("/emp", empRoutes);
app.use("/sales", salesRoutes);
app.use("/customers", customersRoutes);
app.use("/inq", custinq);
app.listen(9999, () => {
  console.log("Server Started...");
});
