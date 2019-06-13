// Model import
const userEngines = require('../models/engines-model');

async function grabEngineUser(id) {
  const engine = await userEngines.getEnginesById(id);
  if (engine) {
    return engine.user_id;
  }
}

module.exports = async (req, res, next) => {
  const engineData = req.params.engineid;

  const userEngineBelongsToID = await grabEngineUser(engineData);

  if (!userEngineBelongsToID) {
    res.status(404).json({ message: `No engine artifact found` });
  } else if (userEngineBelongsToID === req.headers.user.firebase_uuid) {
    next();
  } else {
    res.status(401).json({
      message:
        'You are not authorized to perform this task. Only the creator of this engine may access or modify it.',
    });
  }
};
