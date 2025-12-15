const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('ut_v_list_enterprises.js', () => {
  const group = 'enterprises';
  const scriptName = 'ut_v_list_enterprises';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listEnterprises format', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'response');
      const result = runTransformScript(scriptPath(group, scriptName, 'response'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('returns original DATA on failure', () => {
      const DATA = {error: true};
      const CONTEXT = {success: false};
      const result = runTransformScript(scriptPath(group, scriptName, 'response'), DATA, CONTEXT);
      expect(result.DATA).toEqual(DATA);
    });
  });
});
