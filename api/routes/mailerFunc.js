const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

const mailOptions = (receivers, canSend) => {
  return {
    from: 'recruiterrule@gmail.com',
    to: receivers,
    subject: 'New Candidate Found',
    text: canSend,
  };
};

const sendFunc = (receivers, canSend) => {
  transporter.sendMail(mailOptions(receivers, canSend), (error, info) => {
    if (error) {
      res.status(500).json({ message: 'Email error', error });
    } else {
      res.status(200).json({ message: 'Email sent!' });
      console.log('from email info', info);
    }
  });
};

module.exports = {
  sendFunc,
};
