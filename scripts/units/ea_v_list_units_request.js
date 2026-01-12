// ea_v_list_units_request.js

const params = {
  "$select": "Ref_Key,Description,НаименованиеПолное,DeletionMark"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ea_list_Catalog_КлассификаторЕдиницИзмерения": params
};
