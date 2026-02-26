// ut_v_list_incomingDocuments_response.js

if (!CONTEXT['success']) {
  return DATA;
}

const removeNavigationLink = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach(key => {
    if (key.includes('@navigationLinkUrl')) {
      delete obj[key];
    }
  });
};

const renameKey = (item, from, to) => {
  if (item && item.hasOwnProperty(from)) {
    item[to] = item[from];
    delete item[from];
  }
};

const linkItemsWithBatches = (doc) => {
  if (!doc || !Array.isArray(doc["Товары"])) return;

  const seriesPool = (doc.Серии || []).map(s => ({
    "Серия_Key": s["Серия_Key"],
    "Количество": Number(s["Количество"]) || 0,
    "Номенклатура_Key": s["Номенклатура_Key"],
    "Склад_Key": s["Склад_Key"],
  }));

  const result = doc["Товары"].flatMap(item => {
    const baseItem = { ...item };
    delete baseItem["СтатусУказанияСерий"];
    delete baseItem["Склад_Key"];
    delete baseItem["Серия_Key"];
    renameKey(baseItem, "Упаковка_Key", "ЕдиницаИзмерения");

    // Если серии не требуются
    if (item["СтатусУказанияСерий"] !== 2) {
      return [{ ...baseItem, "Партия_Key": "00000000-0000-0000-0000-000000000000" }];
    }

    let remaining = Number(item["Количество"]) || 0;
    const chunks = [];

    while (remaining > 0) {
      const candidates = seriesPool.filter(
        s => s["Количество"] > 0 &&
          s["Номенклатура_Key"] === item["Номенклатура_Key"] //&& s["Склад_Key"] === item["Склад_Key"]
      );

      if (!candidates.length) break;

      // Приоритет полного совпадения
      const series = candidates.find(s => s["Количество"] === remaining) || candidates[0];
      const take = Math.min(remaining, series["Количество"]);

      chunks.push({ ...baseItem, "Количество": take, "Партия_Key": series["Серия_Key"] });
      series["Количество"] -= take;
      remaining -= take;
    }

    // Остаток без серии
    if (remaining > 0) {
      chunks.push({ ...baseItem, "Количество": remaining, "Партия_Key": "00000000-0000-0000-0000-000000000000" });
    }

    return chunks;
  });

  doc["Товары"] = result;
  delete doc["Серии"];
};




const processItems = (items) => {
  if (!Array.isArray(items)) return;
  items.forEach(item => {
    if (!item || typeof item !== 'object') return;

    renameKey(item, 'Упаковка_Key', 'ЕдиницаИзмерения');
    item['ЕдиницаИзмерения_Type'] = 'StandardODATA.Catalog_КлассификаторЕдиницИзмерения';
    item['Партия_Key'] = '00000000-0000-0000-0000-000000000000';
  });
};

const processDocument = (doc) => {
  if (!doc || typeof doc !== 'object') return;
  removeNavigationLink(doc);
  linkItemsWithBatches(doc);
  renameKey(doc, "Склад", "СтруктурнаяЕдиница")
  renameKey(doc, "Склад_Key", "СтруктурнаяЕдиница_Key")
  renameKey(doc, "ПеревозчикПартнер_Key", "Перевозчик_Key")
  renameKey(doc, "ПеревозчикПартнер", "Перевозчик")
  renameKey(doc, "Товары", "Запасы")
  delete doc["ХозяйственнаяОперация"];

};


const incoming = (DATA["ut_list_Document_ПриобретениеТоваровУслуг"] || []).map(doc => {
  const docCopy = JSON.parse(JSON.stringify(doc));


  processDocument(docCopy);

  docCopy["ВидОперации"] = "ПоступлениеОтПоставщика"

  return docCopy;
})

return {
  "listDocuments": incoming
};
