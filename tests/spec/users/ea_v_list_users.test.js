const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('ea_v_list_users.js', () => {
  const group = 'users';
  const scriptName = 'ea_v_list_users';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = "DeletionMark eq false or Ref_Key eq guid'116804b8-a078-11f0-980a-fa163e527227'"
      DATA["$filter"] = filter
      expected["ea_list_Catalog_Пользователи"]["$filter"] = filter

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
