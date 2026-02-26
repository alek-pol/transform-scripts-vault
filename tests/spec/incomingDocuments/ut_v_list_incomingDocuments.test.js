const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('ut_v_list_incomingDocuments.js', () => {
  const group = 'incomingDocuments';
  const scriptName = 'ut_v_list_incomingDocuments';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      DATA["$filter"] = "СтруктурнаяЕдиница_Key eq guid'5b7c209c-e1c5-11f0-866e-00155d0ad303'"

      expected["ut_list_Document_ПриобретениеТоваровУслуг"]["$filter"]
        = "Склад_Key eq guid'5b7c209c-e1c5-11f0-866e-00155d0ad303'"

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listDocuments format', () => {
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
