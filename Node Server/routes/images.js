const mysql = require('mysql2');
const config = require('config');
const express = require('express');
const app= express.Router();
const multer= require('multer');
const upload = multer({dest : "uploads/"});


app.post('/:carID', upload.array('images', 5), (req, res) => {
    const carid = req.params.carID;
    const images = req.files.map(file => ({ CarID: carid, ImageData: file.buffer }));
    
    sql=`insert into Images`

    res.status(200).send('Images uploaded successfully.');
});

module.exports=app;