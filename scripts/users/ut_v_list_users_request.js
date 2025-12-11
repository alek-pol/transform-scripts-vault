// ut_v_list_users_request.js

const params = {
  "$filter": "Служебный eq false",
  "$select": "Description,Ref_Key"
}

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ut_list_Catalog_Пользователи": params
};
