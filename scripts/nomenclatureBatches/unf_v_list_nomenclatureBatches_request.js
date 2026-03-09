// unf_v_list_nomenclatureBatches_request.js

const params = {};

if (DATA.processName === "stockInventory"){
  params["$select"] = "Ref_Key,Description,ГоденДо,Owner_Key"
} else {
  params["$select"] = "Ref_Key,Description"
}

if (Array.isArray(DATA.batchKeys) && DATA.batchKeys.length > 0) {
  params["$filter"] = DATA.batchKeys.map(guid => `Ref_Key eq guid'${guid}'`).join(' or ');
} else if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "unf_list_Catalog_ПартииНоменклатуры": params
};
