// Model Import
const userContacts = require('../models/userContacts-model');

async function grabContactUser(id) {
  const contact = await userContacts.getContactByContactID(id);
  if (contact) {
    return contact.user_id;
  }
}

module.exports = async (req, res, next) => {
  // Request Definitions
  // come back to this when we figure out optimal token/header req solution
  // for now simple check 'no auth'

  const contactData = req.params.contactid;

  // Contact ownership definition
  const userContactBelongsToID = await grabContactUser(contactData);

  // First, check if contact even exists. Contact will always have a "User owner", so check based on that.
  if (!userContactBelongsToID) {
    res.status(404).json({ message: `No contact artifact found.` });
  } else if (userContactBelongsToID === req.headers.user.firebase_uuid) {
    // come back and change blah to be userContact to userRequesting ===
    // Now we're checking that the user who is logged in is indeed the owner of this contact. If so, continue.
    next();
  } else {
    // And if not, reject.
    res.status(401).json({
      message:
        'You are not authorized to perform this task. Only the creator of this contact may modify it.',
    });
  }
};
