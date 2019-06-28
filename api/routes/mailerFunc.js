const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

// api_user: process.env.SENDUSER,
// api_key: process.env.SENDPASS,

const sendOptions = {
  auth: {
    api_key: process.env.SENDAPIKEY,
  },
};

const transporter = nodemailer.createTransport(sgTransport(sendOptions));

function parseCanSend(canSend, req) {
  let skillPhrase = '';
  let educationPhrase = '';
  let majorPhrase = '';
  let edumajorPhrase = '';
  let yearsOfXPPhrase = '';

  if (canSend.skills !== undefined && canSend.skills.length === 1) {
    skillPhrase = `One of their skills is${canSend.skills.map(
      skill => ` ${skill}`,
    )}. `;
  }
  if (canSend.skills !== undefined && canSend.skills.length === 2) {
    skillPhrase = `Their skills include ${canSend.skills[0]} and ${
      canSend.skills[1]
    }. `;
  }

  if (canSend.skills !== undefined && canSend.skills.length > 2) {
    const skillsArray = canSend.skills;
    const skillsArrayExceptLast = skillsArray.splice(0, skillsArray.length - 1);
    const skillsArrayLast = skillsArray.pop();
    skillPhrase = `Their skills include${skillsArrayExceptLast.map(
      skill => ` ${skill}`,
    )}, and ${skillsArrayLast}. `;
  }
  if (
    canSend.education !== undefined &&
    canSend.education === "Associate's degree"
  ) {
    educationPhrase = `They have an ${canSend.education}. `;
  }
  if (
    canSend.education !== undefined &&
    canSend.education !== "Associate's degree"
  ) {
    educationPhrase = `They have a ${canSend.education}. `;
  }

  if (canSend.experience !== undefined || null) {
    yearsOfXPPhrase = `The candidate has ${
      canSend.experience
    } years of experience. `;
  }

  if (
    canSend.education !== undefined &&
    canSend.major !== undefined &&
    canSend.major.length === 1
  ) {
    edumajorPhrase = `The candidate has${
      canSend.education === "Associate's degree"
        ? ` an ${canSend.education}`
        : ` a ${canSend.education}`
    } with a major in ${canSend.major}. `;
  }

  if (
    canSend.education !== undefined &&
    canSend.major !== undefined &&
    canSend.major.length > 2
  ) {
    const majorsArray = canSend.major;
    const majorArrayExceptLast = majorsArray.splice(0, majorsArray.length - 1);
    const majorArrayLast = majorsArray.pop();

    edumajorPhrase = `The candidate has${
      canSend.education === "Associate's degree"
        ? ` an ${canSend.education}`
        : ` a ${canSend.education}`
    } with majors in${majorArrayExceptLast.map(
      major => ` ${major}`,
    )} and ${majorArrayLast}. `;
  }

  if (
    canSend.education !== undefined &&
    canSend.major !== undefined &&
    canSend.major.length === 2
  ) {
    edumajorPhrase = `The candidate has${
      canSend.education === "Associate's degree"
        ? ` an ${canSend.education}`
        : ` a ${canSend.education}`
    } with majors in ${canSend.major[0]} and ${canSend.major[1]}. `;
  }

  if (canSend.major !== undefined && canSend.major.length === 1) {
    majorPhrase = `They majored in${canSend.major.map(major => ` ${major}`)}. `;
  }
  if (canSend.major !== undefined && canSend.major.length === 2) {
    majorPhrase = `They majored in ${canSend.major[0]} and ${
      canSend.major[1]
    }. `;
  }

  if (canSend.major !== undefined && canSend.major.length > 2) {
    const majorArray = canSend.major;
    const majorArrayMinusLast = majorArray.splice(0, majorArray.length - 1);
    const Lastmajor = majorArray.pop();
    majorPhrase = `They majored in${majorArrayMinusLast.map(
      major => ` ${major}`,
    )} and ${Lastmajor}. `;
  }

  let candidateInfo;

  if (canSend.education !== undefined && canSend.major !== undefined) {
    candidateInfo = yearsOfXPPhrase + skillPhrase + edumajorPhrase;
  } else {
    candidateInfo =
      yearsOfXPPhrase + skillPhrase + educationPhrase + majorPhrase;
  }

  const recruiter_name = req.headers.user.display_name;
  const recruiter_email = req.headers.user.email;

  return `Hello,  ${
    canSend.name
  } would be a great fit for your needs. You can contact the candidate by email at ${
    canSend.email
  }.  ${candidateInfo} Feel free to reach out to me with any questions. Thank you, ${recruiter_name}  ${recruiter_email}`;
}

const mailOptions = (receivers, canSend, req) => {
  // console.log('canSend', canSend);
  const parsedEmail = parseCanSend(canSend, req);
  return {
    to: receivers,
    from: `${req.headers.user.display_name} potentials@recruiterrules.com`,
    subject: `${
      req.headers.user.display_name
    } sent you a new candidate using Recruiter Rules`,
    text: parsedEmail,
    html: `
    <p>${parsedEmail}</p>`,
  };
};

const sendFunc = (receivers, canSend, req, res) => {
  transporter.sendMail(mailOptions(receivers, canSend, req), (error, info) => {
    if (error) {
      // res.status(500).json({ message: 'Email error', error });
      console.log('Emailing error', error);
      // } else {
      //   res.status(200).json({ message: `The candidate's info was successfully sent to ${receivers}.` });
      // console.log('from email info', info);
      console.log(`from email info, email sent to ${receivers}`);
    }
  });
};

module.exports = {
  sendFunc,
};
