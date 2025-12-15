// unf_v_list_enterprises_request.js

const params = {
  "$select": "Description,Ref_Key,ТипСтруктурнойЕдиницы,DeletionMark,КонтактнаяИнформация/Представление,КонтактнаяИнформация/Тип"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "unf_list_Catalog_СтруктурныеЕдиницы": params
};
