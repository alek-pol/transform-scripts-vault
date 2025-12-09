const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('unf_v_list_partners_contacts.js', () => {
  const group = 'partners_contacts';
  const scriptName = 'unf_v_list_partners_contacts';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = "Тип eq 'Адрес'"
      DATA["$filter"] = filter
      expected["unf_list_Catalog_Контрагенты_КонтактнаяИнформация"]["$filter"] = filter

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listPartnersContacts format', () => {
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
