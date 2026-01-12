// erp_v_list_units_request.js

const params = {
  "$select": "Ref_Key,Description,НаименованиеПолное,ТипУпаковки,Числитель,Знаменатель,ВесЕдиницаИзмерения_Key,DeletionMark"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "erp_list_Catalog_УпаковкиЕдиницыИзмерения": params
};
