// ut_v_list_units_response.js

if (!CONTEXT.success) {
  return DATA;
}

const processedUnits = (DATA["ut_list_Catalog_УпаковкиЕдиницыИзмерения"] || []).map(unit => {
  const {ТипУпаковки, ...rest} = unit;
  return {
    ...rest,
    type: ТипУпаковки === "" ? "base" : "custom"
  };
});

return {listUnits: processedUnits};
