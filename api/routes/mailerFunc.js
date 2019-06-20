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
    viewPath: './api/views/',
  }),
);

let mailOptions;

const sendFunc = (receivers, candidateObject, req, res) => {
  mailOptions = {
    from: 'recruiterrule@gmail.com',
    to: receivers,
    subject: `${
      req.headers.user.display_name
    } has a new job candidate for you!`,
    text: 'Testing',
    template: 'index',
    context: {
      user_name: req.headers.user.display_name, // string -- name of recruiter sending candidate
      user_email: req.headers.user.email, // string -- email address associated with recruiter account
      name: candidateObject.name, // string -- name of candidate
      email: candidateObject.email, // string
      title: candidateObject.title, // string
      years_of_XP: candidateObject.years_of_experience, // integer
      skills: candidateObject.skills, // string
      education: candidateObject.education, // string
      industry: candidateObject.industry, // string
      languages: candidateObject.languages, // string
      certifications: candidateObject.certifications, // string
      volunteer: candidateObject.volunteer, // string
      publications: candidateObject.publications, // string
      bio: candidateObject.bio, // boolean
      picture: candidateObject.picture, // boolean
      posts: candidateObject.posts, // boolean
      linkedin_url: candidateObject.linkedin_url, // string
    },
  };
  transporter.sendMail(mailOptions, (error, info) => {
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
