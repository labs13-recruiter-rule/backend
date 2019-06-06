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
      console.log(decodedToken);
      // set what we want in body here
    })
    .catch(err => {
      console.log('from decodeBody', err);
    });
}

function decodeHeader(req, res, next) {
  const { token } = req.headers;

  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      console.log(decodedToken);
      // set what we want in headers here
      req.headers.uid = decodedToken.user_id;
      console.log('rhead', req.headers.uid);
    })
    .catch(err => {
      console.log('from decodeHeader', err);
    });
}
