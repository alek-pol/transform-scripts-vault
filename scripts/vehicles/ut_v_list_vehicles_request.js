// ut_v_list_vehicles_request.js

const params = {
  "$expand": "Тип",
  "$select": "Ref_Key,Code,Description,DeletionMark,Тип/Description"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ut_list_Catalog_ТранспортныеСредства": params
};
