// ea_v_list_units_response.js

if (!CONTEXT.success) {
  return DATA;
}

const processedUnits = (DATA["ea_list_Catalog_КлассификаторЕдиницИзмерения"] || []).map(unit => {
  return {
    ...unit,
    type: "base"
  };
});

return {listUnits: processedUnits};
