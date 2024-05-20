const mysql = require("mysql2");
const config = require("config");
const express = require("express");
const app = express.Router();
const crypto = require("crypto-js");

//Connection details fetched from confi -> default.json
const connectionDetails = {
  host: config.get("host"),
  database: config.get("database"),
  user: config.get("user"),
  password: config.get("password"),
};

//Queries will start from here
app.get("/", (request, response) => {
  var sql = "select * from Customers";
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql, (error, result) => {
    if (error == null) {
      response.send(result);
      connection.end();
    } else {
      response.send(error);
      connection.end();
    }
  });
});

app.get("/id/", (request, response) => {
  var id = request.headers.id;
  var sql = `select * from Customers where CustomerID=${id}`;
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
      console.log(reply);
      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

app.get("/sales", (request, response) => {
  var id = request.headers.id;

  var sql = `select *from sales,cars where sales.CustomerID=${id} and cars.CarID=sales.CarID;`;
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
  var name = request.body.Name;
  var email = request.body.Email;
  var phone = request.body.Phone;
  var address = request.body.Address;
  var pass = request.body.Password;
  var hash = String(crypto.SHA256(pass));
  var sql1 = `insert into Customers(Name,Email,Phone,Address,password) values('${name}','${email}','${phone}','${address}','${hash}');`;
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
      //console.log(error.sqlMessage)
      let reply = {
        result: error.sqlMessage,
        message: "error",
      };
      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    }
  });
});

app.delete("/", (request, response) => {
  var id = request.body.id;
  var sql1 = `delete from customers where CustomerID=${id};`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      response.send(result);
      connection.end();
    } else {
      response.send(error);
      connection.end();
    }
  });
});

app.put("/", (request, response) => {
  var id = request.body.Id;
  var name = request.body.Name;
  var email = request.body.Email;
  var phone = request.body.Phone;
  var address = request.body.Address;
  var pass = request.body.Password;

  var hash = String(crypto.SHA256(pass));

  var sql1 = `update Customers set Name='${name}',Email='${email}',Phone='${phone}',Address='${address}',password='${hash}' where CustomerID=${id};`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      response.send(result);
      connection.end();
    } else {
      response.send(error);
      connection.end();
    }
  });
});

app.post("/login", (request, response) => {
  const { Email, Password } = request.body;

  // encrypt the password
  const encryptedPassword = String(crypto.SHA256(Password));

  // create a sql statement
  const statement = `
        select CustomerId, name, address from customers 
        where
            email = '${Email}' and password = '${encryptedPassword}'
      `;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(statement, (error, result) => {
    //db.execute(statement, [email, encryptedPassword], (error, users) => {
    if (error) {
      let reply = {
        result: error,
        message: "error",
      };
      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      response.end();
      connection.end();
    } else {
      // if there is any user found with email and password
      if (result.length == 0) {
        // no user found
        let reply = {
          message: "customer not found",
        };
        response.setHeader("Content-Type", "application/json");

        response.write(JSON.stringify(reply));
        response.end();
        connection.end();
      } else {
        let reply = {
          result: result,
          message: "success",
        };
        response.setHeader("Content-Type", "application/json");

        response.write(JSON.stringify(reply));
        response.end();
        connection.end();
      }
    }
  });
});

module.exports = app;
