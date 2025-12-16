const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('unf_v_list_nomenclatureBatches.js', () => {
  const group = 'nomenclatureBatches';
  const scriptName = 'unf_v_list_nomenclatureBatches';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query for stockInvetory process', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      DATA.processName = "stockInventory"
      expected["unf_list_Catalog_ПартииНоменклатуры"]["$select"] = "Ref_Key,Description,ГоденДо,Owner_Key"
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);

      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = "Ref_Key eq guid'80e6ba7a-b761-11ee-9773-fa163e41a366'"
      DATA["$filter"] = filter
      expected["unf_list_Catalog_ПартииНоменклатуры"]["$filter"] = filter

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listBatches format', () => {
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
