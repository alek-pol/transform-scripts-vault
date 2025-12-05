const fs = require('fs');
const vm = require('vm');

function runTransformScript(scriptPath, DATA, CONTEXT) {
  const code = fs.readFileSync(scriptPath, 'utf8');
  const wrappedCode = `(function() {\n${code}\n})()`;

  const sandbox = {
    DATA: typeof structuredClone === 'function'
      ? structuredClone(DATA)
      : JSON.parse(JSON.stringify(DATA)),
    CONTEXT: typeof structuredClone === 'function'
      ? structuredClone(CONTEXT)
      : JSON.parse(JSON.stringify(CONTEXT)),
  };

  const context = vm.createContext(sandbox);
  vm.runInContext(wrappedCode, context);

  return {
    DATA: context.DATA,
    CONTEXT: context.CONTEXT,
  };
}

module.exports = { runTransformScript };
