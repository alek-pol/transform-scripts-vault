// {{scriptName}}_response.js

return CONTEXT.success
  ? { "{{outputKey}}": DATA["{{inputKey}}"] }
  : DATA;
