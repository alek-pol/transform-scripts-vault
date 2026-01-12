// unf_v_list_units_request.js

const params = {
  "$select": "Ref_Key,Description,НаименованиеПолное,DeletionMark"
};

const paramsCustom = {
  "$select": "Ref_Key,Description,ЕдиницаИзмеренияВладельца_Key,Коэффициент,DeletionMark"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
  paramsCustom["$filter"] = DATA["$filter"];
}

return {
  "unf_list_Catalog_КлассификаторЕдиницИзмерения": params,
  "unf_list_Catalog_ЕдиницыИзмерения": paramsCustom
};
