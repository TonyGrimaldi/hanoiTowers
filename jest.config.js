const path = require('path');

module.exports = {
  setupFiles: [path.resolve(__dirname, 'testSetup/shim.js')],
  setupTestFrameworkScriptFile: path.resolve(__dirname, 'testSetup/setupTest.js')
};
