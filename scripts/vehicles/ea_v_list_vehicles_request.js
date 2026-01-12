// ea_v_list_vehicles_request.js

const params = {
  "$select": "Ref_Key,Code,Description,DeletionMark"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ea_list_Catalog_ТранспортныеСредства": params
};
