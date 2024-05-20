const mysql = require("mysql2");
const config = require("config");
const express = require("express");
const app = express.Router();

//Connection details fetched from confi -> default.json
const connectionDetails = {
  host: config.get("host"),
  database: config.get("database"),
  user: config.get("user"),
  password: config.get("password"),
};

app.get("/", (request, response) => {
  var id = request.headers.id;
  var sql = `select * from inquiry order by status desc,id`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql, (error, result) => {
    if (error == null) {
      let reply = {
        result: result,
        message: "success",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    } else {
      let reply = {
        result: error,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

app.post("/", (request, response) => {
  var cid = request.body.CustomerId;
  var carid = request.body.CarId;

  var sql1 = `insert into inquiry(CustomerId,CarId,status) values('${cid}','${carid}','pending');`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      let reply = {
        result: result,
        message: "success",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    } else {
      let reply = {
        result: error,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

app.put("/", (request, response) => {
  var { id, status } = request.body;
  var sql1 = `update inquiry set status="${status}" where id=${id};`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      let reply = {
        result: result,
        message: "success",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    } else {
      let reply = {
        result: error,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

app.get("/reqbycustomer/", (request, response) => {
  var cid = request.headers.customerid;
  var carid = request.headers.carid;
  var sql = `select Name,Phone,Email,Make,Model,Price from customers,cars where customerID=${cid} and CarId=${carid};`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql, (error, result) => {
    if (error == null) {
      let reply = {
        result: result,
        message: "success",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    } else {
      let reply = {
        result: error,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

module.exports = app;
