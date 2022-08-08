const express = require('express')
const app = express()
const port = 3000
const path= require('path')
const mongoose = require("mongoose");
const cors = require('cors')
const Booking = require('./model')
const bodyParser = require('body-parser')
require('dotenv').config()
const nodemailer = require('nodemailer');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.9dk4y.mongodb.net/booking_dates?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, console.log('Connected to DB')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const db = mongoose.connection;
const dates =db.collection("dates")

app.get('', (req, res) => {
  res.send('home')
}) 


app.post('/bookings',  (req, res) => {


    const name= req.body.name;
    const email= req.body.email;
    const date=req.body.date

    dates.insertOne({ name: name, email:email, date: date }, (err, result) => {

      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
     
      res.status(200).json({ ok: true })
      
    })

    let transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    const mailOptions = {
      from: '9633aefb3f-4d59a3@inbox.mailtrap.io', 
      to: req.body.email, 
      subject: 'Booking confirmation', 
      text: '',
    };
    
    transport.sendMail(mailOptions, function(err, info) {
     if (err) {
       console.log(err)
     } else {
       console.log(info);
     }
    });
});
 




