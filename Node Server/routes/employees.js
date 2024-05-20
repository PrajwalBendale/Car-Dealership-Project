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
  var sql = "select * from Employees";
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql, (error, result) => {
    if (error == null) {
      response.send(result);
      connection.end();
    } else {
      let reply = response.send(error);
      connection.end();
    }
  });
});

// app.get('/sales',(request,response)=>{
//     var id=request.headers.id;
//     console.log(id)
//     console.log(request.headers)
//     var sql=`select *from sales where EmployeeID=${id};`
//     var connection= mysql.createConnection(connectionDetails);
//     connection.query(sql,(error,result)=>{
//         if (error==null) {
//             response.send(result);
//             connection.end();

//         } else {
//             response.send(error);
//             connection.end();

//         }
//     })
// });

app.post("/", (request, response) => {
  var name = request.body.Name;
  var email = request.body.Email;
  // var position=request.body.Position;
  var pass = request.body.Password;

  var hash = String(crypto.SHA256(pass));
  var sql1 = `insert into Employees(Name,Position,ContactInfo,Password) values('${name}','sales','${email}','${hash}');`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      let reply = {
        result: result,
        message: "success",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      console.log(reply);
      //response.send(result);
      connection.end();
      response.end();
    } else {
      let reply = {
        result: error,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      console.log(reply);
      //response.send(result);
      connection.end();
      response.end();
      // response.send(error);
      // connection.end();
    }
  });
});

app.delete("/", (request, response) => {
  var id = request.body.id;
  var sql1 = `delete from Employees where EmployeeID=${id};`;
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
        select EmployeeId, name, position from Employees 
        where
            contactinfo = '${Email}' and password = '${encryptedPassword}'
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
      //response.send(result);
      connection.end();
      response.end();
      // response.send(error);
      // connection.end();
    } else {
      // if there is any user found with email and password
      if (result.length == 0) {
        // no user found
        let reply = {
          result: "Employee not found",
          message: "error",
        };

        response.setHeader("Content-Type", "application/json");

        response.write(JSON.stringify(reply));
        //response.send(result);
        connection.end();
        response.end();
        //response.send(JSON.stringify('Employee not found'))
      } else {
        let reply = {
          result: result,
          message: "success",
        };

        response.setHeader("Content-Type", "application/json");

        response.write(JSON.stringify(reply));
        //response.send(result);
        connection.end();
        response.end();
        //const user = users[0]

        // create a payload for jwt token
        //   const payload = {
        //     id: user['id'],
        //     name: user['name'],
        //     type: 'customer',
        //   }

        // create a token
        //   const token = jwt.sign(payload, config.secrete)
        //   response.send(
        //     utils.createSuccessResponse({
        //       token,
        //       name: user['name'],
        //     })
        //   )
      }
    }
  });
});

// app.put('/',(request,response)=>{
//     var id=request.body.Id;
//     var name=request.body.Name;
//     var email=request.body.Email;
//     var phone=request.body.Phone;
//     var address=request.body.Address;
//     var pass=request.body.Password;
//     var sql1=`update Customers set Name='${name}',Email='${email}',Phone='${phone}',Address='${address}',password='${pass}' where CustomerID=${id};`;
//     var connection= mysql.createConnection(connectionDetails);
//     connection.query(sql1,(error,result)=>{
//         if (error==null) {
//             response.send(result);
//             connection.end();

//         } else {
//             response.send(error);
//             connection.end();

//         }
//     })
// });

module.exports = app;
