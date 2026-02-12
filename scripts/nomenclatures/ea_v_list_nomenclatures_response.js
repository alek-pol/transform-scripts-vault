// ea_v_list_nomenclatures_response.js


if (!CONTEXT.success) {
  return DATA;
}

const tmpData = DATA["erp_list_Catalog_Номенклатура"];

if (["productionBatch", "transportBatch", "incomingInvoice", "stockInventory", "front"].includes(CONTEXT.params.processName)) {
  item["Вес"] = 0
  item["СрокГодности"] = "0"
}

return {
  "listNomenclatures": tmpData
};
