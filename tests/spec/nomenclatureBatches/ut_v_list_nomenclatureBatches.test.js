const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('ut_v_list_nomenclatureBatches.js', () => {
  const group = 'nomenclatureBatches';
  const scriptName = 'ut_v_list_nomenclatureBatches';

  describe('request transformation', () => {
    it('builds correct OData query with batch keys filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);

      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query without filter', () => {
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), {}, {});
      const expected = {'ut_list_Catalog_СерииНоменклатуры':
          {'$select': 'Ref_Key,Description'}
      }

      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query for stockInvetory process', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      DATA.processName = "stockInventory"
      expected["ut_list_Catalog_СерииНоменклатуры"]["$select"] = "Ref_Key,Description,ГоденДо"
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
