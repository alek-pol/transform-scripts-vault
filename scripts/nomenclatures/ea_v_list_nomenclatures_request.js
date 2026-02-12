// ea_v_list_nomenclatures_request.js

const params = {};

if(DATA.processName === "syncNomenclatureTransport") {
  params["$filter"] = "IsFolder eq false and ПодконтрольнаяПродукцияВЕТИС eq true"
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark"
} else if (["productionBatch", "transportBatch", "incomingInvoice"].includes(DATA.processName)) {
  params["$expand"] = "ЕдиницаИзмерения"
  params["$filter"] = DATA["$filter"]
  params["$select"] = "Ref_Key,Description,ПодконтрольнаяПродукцияВЕТИС,ЕдиницаИзмерения/Description,ЕдиницаИзмерения_Key"
} else if (DATA.processName === "stockInventory"){
  params["$expand"] = "Parent"
  params["$filter"] = "IsFolder eq false"
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark,Parent/Description,Code,ПодконтрольнаяПродукцияВЕТИС"
} else if (DATA.processName === "front") {
  params["$expand"] = "Parent"
  params["$filter"] = DATA["$filter"]
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark,Parent/Description"
}

return {
  "ea_list_Catalog_Номенклатура": params
};
