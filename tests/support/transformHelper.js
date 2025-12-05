const path = require('path');
const fs = require('fs');
const { runTransformScript } = require('../../tools/runner');

/**
 * Loads fixtures for a specific script and direction.
 */
function loadFixture(group, scriptName, direction) {
  const base = path.join(__dirname, '..', 'fixtures', group, scriptName, direction);

  // Load DATA.json - required
  const DATA = JSON.parse(fs.readFileSync(path.join(base, 'DATA.json'), 'utf8'));

  // Default CONTEXT
  const defaultContext = direction === 'request' ? {} : { success: true };

  // Try Load CONTEXT.json
  const contextPath = path.join(base, 'CONTEXT.json');
  let CONTEXT;
  if (fs.existsSync(contextPath)) {
    CONTEXT = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  } else {
    CONTEXT = defaultContext;
  }

  // Load expected.DATA.json - required
  const expected = JSON.parse(fs.readFileSync(path.join(base, 'expected.DATA.json'), 'utf8'));

  return { DATA, CONTEXT, expected };
}

function scriptPath(group, scriptName, direction = 'request') {
  const suffix = direction === 'response' ? '_response' : '_request';
  return path.join(__dirname, '..', '..', 'scripts', group, `${scriptName}${suffix}.js`);
}

module.exports = { loadFixture, scriptPath, runTransformScript };
