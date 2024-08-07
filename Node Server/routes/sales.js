const mysql = require("mysql2");
const config = require("config");
const express = require("express");
const app = express.Router();
const nodemailer = require("nodemailer");
//Connection details fetched from confi -> default.json
const connectionDetails = {
  host: config.get("host"),
  database: config.get("database"),
  user: config.get("user"),
  password: config.get("password"),
};

//Queries will start from here
app.get("/", (request, response) => {
  var sql = "select * from Sales";
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

app.get("/emp/", (request, response) => {
  var id = request.headers.id;
  var sql = `select * from Sales where EmployeeID=${id}`;
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
        result: result,
        message: "error",
      };

      response.setHeader("Content-Type", "application/json");

      response.write(JSON.stringify(reply));
      connection.end();
    }
  });
});

// app.post('/',(request,response)=>{
//     var itemdesc=request.body.Itemdesc;
//     var sql1=`insert into sales(itemdesc) values('${itemdesc}');`;
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

app.post("/", (request, response) => {
  var id = request.body.id;
  var carid = request.body.CarID;
  var cid = request.body.CustomerID;
  var eid = request.body.EmployeeID;
  var price = request.body.SalePrice;
  var sql1 = `insert into Sales(CarID,CustomerID,EmployeeID,SaleDate,SalePrice) values(${carid},${cid},${eid},CONVERT(SYSDATE(), DATE),${price});`;
  var connection = mysql.createConnection(connectionDetails);
  connection.query(sql1, (error, result) => {
    if (error == null) {
      connection.query(`delete from inquiry where id=${id}`, (err, res) => {
        if (err == null) {
          let reply = {
            result: result + res,
            message: "success",
          };
          response.setHeader("Content-Type", "application/json");
          response.write(JSON.stringify(reply));
          connection.query(
            `select Email from customers where CustomerID=${cid}`,
            (error, result) => {
              if (error == null) {
                //console.log(result[0].Email);
                var mailid = result[0].Email;
                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: "prajwalbendale872@gmail.com",
                    pass: "lagi asdd avaq enon",
                  },
                });
                const mailOptions = {
                  from: "prajwalbendale872@gmail.com",
                  to: mailid,
                  subject: `Purchase Succeful Notification`,
                  text: `Dear,
            
            I hope this message finds you well. Yours Purchase with Big Boys Cars @LuxCars has been succefully done.
            Thanks for choosing us for Service. Feel free to contact us for further services             
          
            Best regards,
            BBC Team`,
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.log(err);
                  } else {
                    //console.log("mail sent!!!");
                  }
                });
              }
            }
          );

          connection.end();
        } else {
          response.send(err);
          connection.end();
        }
      });
    } else {
      response.send(error);
      connection.end();
    }
  });
});

app.put("/", (request, response) => {
  var id = request.body.Id;
  var name = request.body.CarID;
  var email = request.body.CustomerID;
  var phone = request.body.EmployeeID;
  var address = request.body.SaleDate;
  var pass = request.body.SalePrice;
  var sql1 = `update Sales set CarID=${name},CustomerID=${email},EmployeeID=${phone},SaleDate='${address}',SalePrice=${pass} where SaleID=${id};`;
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

app.delete("/", (request, response) => {
  var id = request.body.id;
  var sql1 = `delete from Sales where SaleID=${id};`;
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

module.exports = app;
