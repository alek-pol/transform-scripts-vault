const fs = require('fs');
const vm = require('vm');

function runTransformScript(scriptPath, DATA, CONTEXT) {
  const code = fs.readFileSync(scriptPath, 'utf8');
  const wrappedCode = `(function(DATA, CONTEXT) { ${code} })`;

  const sandbox = { DATA: DATA, CONTEXT: CONTEXT };
  const context = vm.createContext(sandbox);
  const transformFn = vm.runInContext(wrappedCode, context);

  return { DATA: transformFn(DATA, CONTEXT) || DATA, CONTEXT };
}

module.exports = { runTransformScript };
