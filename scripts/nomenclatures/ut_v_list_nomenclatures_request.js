// ut_v_list_nomenclatures_request.js

const params = {};

if(DATA.processName === "syncNomenclatureTransport") {
  params["$filter"] = "IsFolder eq false and (ОсобенностьУчета eq 'ПодконтрольнаяПродукцияВЕТИС' or ОсобенностьУчета eq 'МолочнаяПродукцияПодконтрольнаяВЕТИС')"
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark"
} else if (["productionBatch", "transportBatch", "incomingInvoice"].includes(DATA.processName)) {
  params["$expand"] = "ЕдиницаИзмерения"
  params["$filter"] = DATA["$filter"]
  params["$select"] = "Ref_Key,Description,ПодконтрольнаяПродукцияВЕТИС,СрокГодности,ЕдиницаИзмеренияСрокаГодности,ВесЧислитель,ВесЗнаменатель,ЕдиницаИзмерения/Description,ЕдиницаИзмерения_Key,ОсобенностьУчета"
} else if (DATA.processName === "stockInventory"){
  params["$expand"] = "Parent"
  params["$filter"] = "IsFolder eq false"
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark,Parent/Description,СрокГодности,ЕдиницаИзмеренияСрокаГодности,ВесЧислитель,ВесЗнаменатель,Code,ПодконтрольнаяПродукцияВЕТИС,ОсобенностьУчета"
} else if (DATA.processName === "front") {
  params["$expand"] = "Parent"
  params["$filter"] = "IsFolder eq false and (ОсобенностьУчета eq 'ПодконтрольнаяПродукцияВЕТИС' or ОсобенностьУчета eq 'МолочнаяПродукцияПодконтрольнаяВЕТИС') and " + DATA["$filter"]
  params["$select"] = "Ref_Key,Description,Артикул,DeletionMark,Parent/Description,СрокГодности,ОсобенностьУчета"
}

return {
  "ut_list_Catalog_Номенклатура": params
};
