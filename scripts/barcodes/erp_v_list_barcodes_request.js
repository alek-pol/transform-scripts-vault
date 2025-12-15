// erp_v_list_barcodes_request.js

const params = {
  "$select": "Номенклатура_Key,ЗначениеШтрихкода"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
} else if (Array.isArray(DATA["$filter"])) {
  if (DATA["$filter"].length > 0) {
    const filterParts = DATA["$filter"].map(guid =>
      `(Ref_Key eq guid'${guid}')`
    );
    params["$filter"] = filterParts.join(' or ');
  }
}

return {
  "erp_list_Catalog_ШтрихкодыУпаковокТоваров": params
};
