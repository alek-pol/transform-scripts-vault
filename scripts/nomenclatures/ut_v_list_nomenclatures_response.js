// ut_v_list_nomenclatures_response.js

if (!CONTEXT.success) {
  return DATA;
}

const tmpData = DATA["ut_list_Catalog_Номенклатура"];

if (["productionBatch", "transportBatch", "incomingInvoice", "stockInventory"].includes(CONTEXT.params.processName)) {
  tmpData.forEach(item => {
    if (item["ВесЧислитель"] !== 0 && item["ВесЗнаменатель"] !== 0) {
      item["Вес"] = item["ВесЧислитель"] / item["ВесЗнаменатель"];
    } else {
      item["Вес"] = 0
    }

    if (["ПодконтрольнаяПродукцияВЕТИС", "МолочнаяПродукцияПодконтрольнаяВЕТИС"].includes(item["ОсобенностьУчета"])) {
      item["ПодконтрольнаяПродукцияВЕТИС"] = true
    }

    delete item["ВесЧислитель"];
    delete item["ВесЗнаменатель"];
    delete item["ОсобенностьУчета"];
  });
}

return {
  "listNomenclatures": tmpData
};
