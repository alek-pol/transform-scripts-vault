const {loadFixture, scriptPath, runTransformScript} = require('../../support/transformHelper');

describe('unf_v_list_nomenclatures.js', () => {
  const group = 'nomenclatures';
  const scriptName = 'unf_v_list_nomenclatures';

  describe('request transformation', () => {
    it('builds correct OData query dor productionBatch', () => {
      const {DATA, CONTEXT, expected} = loadFixture(group, scriptName, 'request');
      DATA.processName = "productionBatch"
      filter = "Ref_Key eq guid'6b30060a-9528-11ef-8273-fa163e41a366'"
      DATA["$filter"] = filter

      const result = runTransformScript(scriptPath(group, scriptName, 'request'), DATA, CONTEXT);

      expect(result.DATA).toEqual(expected);
    });
  });

  describe('response transformation', () => {
    it('maps to unified listNomenclatures format', () => {
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
