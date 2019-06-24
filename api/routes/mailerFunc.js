const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

function parseCanSend(canSend, req) {


  let skillPhrase = `Their skills include:` +  canSend.skills.map(skill => ` ${skill}`) + `. `; 
  let educationPhrase = `Their education includes: ${canSend.education}. `;
  let majorPhrase = `They majored in` + canSend.major.map(major => ` ${major}`) + `. `;
  let yearsOfXPPhrase = `The candidate has ${canSend.experience} years of experience. `;
  if (canSend.skills === undefined) {
    skillPhrase = '';
  }
  if (canSend.education === undefined) {
    educationPhrase = '';
  }
  if (canSend.major === undefined) {
    majorPhrase = '';
  }
  if (canSend.experience === undefined || null) {
    yearsOfXPPhrase = '';
  }
  const candidateInfo =
    skillPhrase + educationPhrase + majorPhrase + yearsOfXPPhrase;

  const recruiter_name = req.headers.user.display_name;
  const recruiter_email = req.headers.user.email;

  return `Hello, ${
    canSend.name
  } would be a great fit for your company. You can contact the candidate by email at ${
    canSend.email
  }. ${candidateInfo}Feel free to reach out to me with any questions. Thank you, ${recruiter_name}  ${recruiter_email}`;
}

const mailOptions = (receivers, canSend, req) => {
  console.log('canSend', canSend);
  const parsedEmail = parseCanSend(canSend, req);
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
