const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('erp_v_list_users.js', () => {
  const group = 'users';
  const scriptName = 'erp_v_list_users';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = "DeletionMark eq false or Ref_Key eq guid'f1ed68d9-203a-11eb-8067-60a44ccf8f74'"
      DATA["$filter"] = filter
      expected["erp_list_Catalog_Пользователи"]["$filter"] = filter

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listUsers format', () => {
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
