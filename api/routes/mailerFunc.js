const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

function parseCanSend(canSend) {
  return `Hello, ${
    canSend.name
  } would be a good fit for your company. Their skills include ${
    canSend.skills
  }. You can contact them at ${
    canSend.email
  }. Feel free to email me with any questions.`;
}

const mailOptions = (receivers, canSend, req) => {
  console.log('canSend', canSend);
  const parsedEmail = parseCanSend(canSend);
  return {
    from: 'recruiterrule@gmail.com',
    to: receivers,
    subject: `${req.headers.user.display_name} -- New Candidate!`,
    text: parsedEmail,
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
