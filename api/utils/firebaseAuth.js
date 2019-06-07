const admin = require('../firebase/admin');

module.exports = {
  decodeBody,
  decodeHeader,
};

function decodeBody(req, res, next) {
  const { token } = req.body;
console.log(token)
  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      console.log("from decode",decodedToken);
      // set what we want in body here
      req.body.email = decodedToken.email;
      req.body.firebase_uuid = decodedToken.uid;
      next();
    })
    .catch(err => {
      console.log('from decodeBody', err);
    });
}

function decodeHeader(req, res, next) {
  const { token } = req.headers;
  console.log('from token fajs', token);
  console.log('from req headers fajs', req.headers);
  console.log('from req', req)

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
