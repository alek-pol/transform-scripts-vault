// ut_v_list_units_request.js

const params = {
  "$select": "Ref_Key,Description,НаименованиеПолное,ТипУпаковки"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ut_list_Catalog_УпаковкиЕдиницыИзмерения": params
};
