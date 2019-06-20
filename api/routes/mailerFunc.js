const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.senderEMAIL,
    pass: process.env.senderPASSWORD,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/',
  }),
);

const mailOptions = (receivers, candidate, req) => {
  return {
    from: 'recruiterrule@gmail.com',
    to: receivers,
    subject: `${
      req.headers.user.display_name
    } has a new job candidate for you!`,
    text: '',
    template: 'index',
    context: {
      user_name: req.headers.user.display_name, // string -- name of recruiter sending candidate
      user_email: req.headers.user.email, // string -- email address associated with recruiter account
      name: candidate.name, // string -- name of candidate
      email: candidate.email, // string
      title: candidate.title, // string
      years_of_XP: candidate.years_of_experience, // integer
      skills: candidate.skills, // string
      education: candidate.education, // string
      industry: candidate.industry, // string
      languages: candidate.languages, // string
      certifications: candidate.certifications, // string
      volunteer: candidate.volunteer, // string
      publications: candidate.publications, // string
      bio: candidate.bio, // boolean
      picture: candidate.picture, // boolean
      posts: candidate.posts, // boolean
      linkedin_url: candidate.linkedin_url, // string
    },
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
