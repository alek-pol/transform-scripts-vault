// unf_v_list_partners_contacts_request.js

const params = {
  "$expand": "Вид",
  "$select": "Ref_Key,Представление,Вид/PredefinedDataName"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "unf_list_Catalog_Контрагенты_КонтактнаяИнформация": params
};
