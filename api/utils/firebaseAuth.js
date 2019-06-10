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
      res.status(401).json({ message: 'Invalid token!', err });
    });
}

function decodeHeader(req, res, next) {
  const { token } = req.headers;

  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      req.headers.user = {
        email: decodedToken.email,
        firebase_uuid: decodedToken.uid,
        display_name: decodedToken.name,
        profile_photo: decodedToken.profile_photo,
      };

      // req.headers.firebase_uuid = decodedToken.uid;
      // req.headers.email = decodedToken.email;

      // console.log('new reqhead', req.headers);
      // insert email address here
      next();
    })
    .catch(err => {
      res.status(500).json({ Message: `Token error!`, err });
    });
}
