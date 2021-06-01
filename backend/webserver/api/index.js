const express = require('express');
const cors = require('cors');

module.exports = dependencies => {
  const router = express.Router();
  const moduleName = 'linagora.esn.unifiedinbox';
  const moduleMW = dependencies('moduleMW');
  const authorizationMW = dependencies('authorizationMW');

  router.all('/*',
    cors({origin: true, credentials: true}),
    authorizationMW.requiresAPILogin,
    moduleMW.requiresModuleIsEnabledInCurrentDomain(moduleName)
  );
  router.use('/sendemail', require('./sendEmail')(dependencies));
  router.use('/forwardings', require('./forwardings')(dependencies));
  router.use('/users', require('./users')(dependencies));

  return router;
};
