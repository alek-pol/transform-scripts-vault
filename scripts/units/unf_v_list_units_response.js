// unf_v_list_units_response.js

if (!CONTEXT.success) {
  return DATA;
}

const processedUnits = (DATA["unf_list_Catalog_КлассификаторЕдиницИзмерения"] || []).map(unit => ({
  ...unit,
  type: "base",
  "ЕдиницаИзмеренияВладельца_Key": "00000000-0000-0000-0000-000000000000",
  "Коэффициент": 0
}));

const processedCustomUnits = (DATA["unf_list_Catalog_ЕдиницыИзмерения"] || []).map(unit => ({
  ...unit,
  type: "custom",
  "НаименованиеПолное": unit.Description
}));

return {
  "listUnits": [...processedUnits, ...processedCustomUnits]
};
