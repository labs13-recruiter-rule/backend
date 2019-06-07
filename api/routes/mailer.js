var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'recruiterrule@gmail.com',
    pass: 'B4B4Bl4ckSh33p!'
  }
});

var mailOptions = {
  from: 'lambdalabsrecruiter@gmail.com',
  to: 'ducbavu531@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});