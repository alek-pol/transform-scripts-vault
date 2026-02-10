// erp_v_list_partners_request.js

const params = {};

if (DATA.processName === "front"){
  for (const key of ["$filter", "$expand", "$select"]) {
    if (key in DATA) {
      params[key] = DATA[key];
    }
  }
} else {
  params["$filter"] = "ИНН ne ''"
  params["$select"] = "Ref_Key,Description,ИНН,DeletionMark"
}

return {
  "erp_list_Catalog_Контрагенты": params
};
