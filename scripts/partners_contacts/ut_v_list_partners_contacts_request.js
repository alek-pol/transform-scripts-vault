// ut_v_list_partners_contacts_request.js

const params = {
  "$expand": "Вид",
  "$filter": "Тип eq 'Адрес'",
  "$select": "Ref_Key,Представление,Вид/PredefinedDataName"
};

if (typeof DATA["$filter"] === 'string' && DATA["$filter"].trim() !== '') {
  params["$filter"] = `${params["$filter"]} and ${DATA["$filter"]}`
}

return {
  "ut_list_Catalog_Контрагенты_КонтактнаяИнформация": params
};


