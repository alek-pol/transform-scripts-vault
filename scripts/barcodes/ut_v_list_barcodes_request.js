// ut_v_list_barcodes_request.js

const params = {
  "$select": "Ref_Key,Номенклатура_Key,ЗначениеШтрихкода"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
} else if (Array.isArray(DATA["$filter"])) {
  if (DATA["$filter"].length > 0) {
    params["$filter"] = DATA["$filter"].map(guid => `(Ref_Key eq guid'${guid}')`).join(' or ');
  }
}

return {
  "ut_list_Catalog_НоменклатураКонтрагентов_ДругиеШтрихкодыНоменклатуры": params
};
