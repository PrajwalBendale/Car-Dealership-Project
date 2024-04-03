const mysql = require('mysql2');
const config = require('config');
const express = require('express');
const app= express.Router();
const multer = require('multer')
const upload = multer({dest:'images'})

//Connection details fetched from confi -> default.json
const connectionDetails ={
    host :config.get("host"),
    database :config.get("database"),
    user :config.get("user"),
    password :config.get("password")
}

//Queries will start from here
app.get('/',(request,response)=>{
    
    var sql="select * from Cars ";
    var connection= mysql.createConnection(connectionDetails);
    connection.query(sql,(error,result)=>{
        if (error==null) {
            let reply = {
                'result' : result,
                'message' : 'success'
            }
            //response.write(JSON.stringify(reply))
            response.send(JSON.stringify(reply))
            
            response.end()
            connection.end();
            
        } else {
            response.send(error);
            connection.end();
            
        }
    })
});

app.post('/car/',(request,response)=>{
    var id=request.body.CarId
    
    var sql=`select * from Cars where CarID=${id}`;
    var connection= mysql.createConnection(connectionDetails);
    connection.query(sql,(error,result)=>{
        if (error==null) {
            let reply = {
                'result' : result,
                'message' : 'success'
            }
            //response.write(JSON.stringify(reply))
            response.send(JSON.stringify(reply))
            response.end()
            connection.end();
            
        } else {
            response.send(error);
            connection.end();
            
        }
    })
});

app.post('/',upload.single('image'),(request,response)=>{
    
    var make=request.body.Make;
    var model=request.body.Model;
    var year=request.body.Year;
    var vin=request.body.VIN;
    var price=request.body.Price;
    var status=request.body.Status;
    var sql1=`insert into Cars(Make,Model,Year,VIN,Price,Status,Image) values("${make}","${model}","${year}","${vin}",${price},"${status}","${request.file.filename}");`;
    var connection= mysql.createConnection(connectionDetails);
    connection.query(sql1,(error,result)=>{
        if (error==null) {
            let reply = {
                'result' : result,
                'message' : 'success'
            }
            response.write(JSON.stringify(reply))
            //response.send(JSON.stringify(reply));
            response.end();
            connection.end();
            
        } else {
            let reply = {
                'result' : error,
                'message' : 'error'
            }
            console.log(error)
            response.write(JSON.stringify(reply))
            //response.send(JSON.stringify(reply))
            response.end()
            connection.end();
            
        }
    })
});
app.put('/',(request,response)=>{
    var id=request.body.CarID;
    var model=request.body.Model;
    var price=request.body.Price;
    var year=request.body.Year;
    var status=request.body.Status;
    var pass=request.body.Password;
    var sql1=`update Cars set Model='${model}',Price='${price}',Year='${year}',Status='${status}' where CarID=${id};`;
    var connection= mysql.createConnection(connectionDetails);
    connection.query(sql1,(error,result)=>{
        if (error==null) {
            response.send(result);
            connection.end();
            
        } else {
            response.send(error);
            connection.end();
            
        }
    })
});


app.delete('/',(request,response)=>{
    var id=request.body.id;
    var sql1=`delete from Cars where CarID=${id};`;
    var connection= mysql.createConnection(connectionDetails);
    connection.query(sql1,(error,result)=>{
        if (error==null) {
            response.send(result);
            connection.end();
            
        } else {
            response.send(error);
            connection.end();
            
        }
    })
});



module.exports=app;
