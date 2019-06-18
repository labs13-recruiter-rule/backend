const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

const mailOptions = (receivers, canSend, req) => {
  return {
    from: 'recruiterrule@gmail.com',
    to: receivers,
    subject: `${req.headers.user.display_name} -- New Candidate!`,
    text: JSON.stringify(canSend),
  };
};

const sendFunc = (receivers, canSend, req, res) => {
  transporter.sendMail(mailOptions(receivers, canSend, req), (error, info) => {
    if (error) {
      // res.status(500).json({ message: 'Email error', error });
      console.log('Emailing error', error);
    } else {
      // res.status(200).json({ message: 'Email sent!' });
      // console.log('from email info', info);
      console.log('from email info, email sent');
    }
  });
};

module.exports = {
  sendFunc,
};
