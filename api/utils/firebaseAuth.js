const admin = require('../firebase/admin');

module.exports = {
  decodeBody,
  decodeHeader,
};

function decodeBody(req, res, next) {
  const { token } = req.body;
  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      // set what we want in body here
      req.body.user = {
        email: decodedToken.email,
        firebase_uuid: decodedToken.uid,
        display_name: decodedToken.name,
        profile_photo: decodedToken.profile_photo,
      };

      next();
    })
    .catch(err => {
      console.log('from decodeBody', err);
      res.status(401).json({ message: 'Invalid token!', err });
    });
}

function decodeHeader(req, res, next) {
  const { token } = req.headers;
  // Don't use this function

  // admin
  //   .auth()
  //   .verifyIdToken(token)
  //   .then(decodedToken => {
  //     console.log(decodedToken);
  //     // set what we want in headers here
  //     req.headers.uid = decodedToken.user_id;
  //     console.log('rhead', req.headers.uid);
  //   })
  //   .catch(err => {
  //     console.log('from decodeHeader', err);
  //   });
}
