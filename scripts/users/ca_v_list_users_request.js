// ca_v_list_users_request.js

const params = {
  "$filter": "Служебный eq false",
  "$select": "Description,Ref_Key,DeletionMark"
}

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ca_list_Catalog_Пользователи": params
};
