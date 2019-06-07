var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD
  }
});





router.post('/', (req, res) => {
    const recievers = req.body.recievers || 'ducbavu531@gmail.com'
    var mailOptions = {
        from: 'recruiterrule@gmail.com',
        to: recievers,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log(error);
          res.status(500).json(error)
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json(info)
        }
    });
});

module.exports = router

