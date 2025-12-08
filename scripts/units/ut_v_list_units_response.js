// ut_v_list_units_response.js

if (!CONTEXT.success) {
  return DATA;
}

const processedUnits = (DATA["ut_list_Catalog_УпаковкиЕдиницыИзмерения"] || []).map(unit => {
  const type = unit["ТипУпаковки"]
  const rate = unit["Числитель"]/unit["Знаменатель"]
  const customKey = unit["ВесЕдиницаИзмерения_Key"]

  delete unit["ТипУпаковки"];
  delete unit["Числитель"];
  delete unit["Знаменатель"];
  delete unit["ВесЕдиницаИзмерения_Key"];

  return {
    ...unit,
    "type": type === "" ? "base" : "custom",
    "Коэффициент": type === "" ? 0 : rate,
    "ЕдиницаИзмеренияВладельца_Key": customKey
  };
});

return {listUnits: processedUnits};
