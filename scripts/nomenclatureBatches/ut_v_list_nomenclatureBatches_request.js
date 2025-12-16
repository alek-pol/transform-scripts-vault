// ut_v_list_nomenclatureBatches_request.js

const params = {};

if (DATA.processName === "stockInventory"){
  params["$select"] = "Ref_Key,Description,ГоденДо"
} else {
  params["$select"] = "Ref_Key,Description"
}

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "ut_list_Catalog_СерииНоменклатуры": params
};
