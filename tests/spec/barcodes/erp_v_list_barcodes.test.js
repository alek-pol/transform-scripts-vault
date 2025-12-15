const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('erp_v_list_barcodes.js', () => {
  const group = 'barcodes';
  const scriptName = 'erp_v_list_barcodes';

  describe('request transformation', () => {
    it('builds correct OData query', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with string filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = "Ref_Key eq guid'bc2a7f6e-66f0-11f0-8025-fa163e41a366'"
      DATA["$filter"] = filter
      expected["erp_list_Catalog_ШтрихкодыУпаковокТоваров"]["$filter"] = filter

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });

    it('builds correct OData query with array filter', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');

      const filter = ["bc2a7f6e-66f0-11f0-8025-fa163e41a366", "bc34481e-66f0-11f0-8025-fa163e41a366"]
      DATA["$filter"] = filter
      expected["erp_list_Catalog_ШтрихкодыУпаковокТоваров"]["$filter"] = filter
        .map(guid => `(Ref_Key eq guid'${guid}')`).join(' or ')

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);
      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listBarcodes format', () => {
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
