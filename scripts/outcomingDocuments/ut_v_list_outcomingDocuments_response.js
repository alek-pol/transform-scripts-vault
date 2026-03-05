// ut_v_list_outcomingDocuments_response.js

// Поле Товары/СтатусУказанияСерий:
// 0 — серия не требуется (или не указана)

if (!CONTEXT.success) {
  return DATA;
}

const deliveryMethodsRequiringVehicle = [
  "ДоКлиента",
  "СиламиПеревозчикаПоАдресу",
  "КПолучателюОпределяетСлужбаДоставки"
];

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

const linkItemsWithBatches = (doc, docType) => {
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
    renameKey(baseItem, "Упаковка_Key", "ЕдиницаИзмерения");

    // Если серии не требуются
    if (item["СтатусУказанияСерий"] === 0) {
      return [{ ...baseItem, "Партия_Key": "00000000-0000-0000-0000-000000000000" }];
    }

    let remaining = Number(item["Количество"]) || 0;
    const chunks = [];

    while (remaining > 0) {
      const candidates = seriesPool.filter(
        s => s["Количество"] > 0 &&
          s["Номенклатура_Key"] === item["Номенклатура_Key"] &&
          (docType !== "Продажа" || s["Склад_Key"] === item["Склад_Key"])
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

const processDocument = (doc, docType) => {
  if (!doc || typeof doc !== 'object') return;
  removeNavigationLink(doc);
  linkItemsWithBatches(doc, docType);

  if (docType === "Продажа") {
    renameKey(doc, "Склад", "СтруктурнаяЕдиница")
    renameKey(doc, "Склад_Key", "СтруктурнаяЕдиница_Key")
  } else  {
    renameKey(doc, "СкладОтправитель", "СтруктурнаяЕдиница")
    renameKey(doc, "СкладОтправитель_Key", "СтруктурнаяЕдиница_Key")
    renameKey(doc, "СкладПолучатель", "СтруктурнаяЕдиницаПолучатель")
    renameKey(doc, "СкладПолучатель_Key", "СтруктурнаяЕдиницаПолучатель_Key")
  }

  renameKey(doc, "ПеревозчикПартнер_Key", "Перевозчик_Key")
  renameKey(doc, "ПеревозчикПартнер", "Перевозчик")

  renameKey(doc, "Товары", "Запасы")
  delete doc["ХозяйственнаяОперация"];

  if (deliveryMethodsRequiringVehicle.includes(doc["СпособДоставки"])) {
    const task = transportTasks.find(t => Array
      .isArray(t["Распоряжения"]) && t["Распоряжения"]
      .some(r => r["Распоряжение"] === doc["Ref_Key"])
    );

    if (task && task["ТранспортноеСредство"]) {
      doc["Автомобиль_Key"] = task["ТранспортноеСредство"];
      doc["Автомобиль"] = {
        "Description": task["ТранспортноеСредство_Expanded"].Description
      }
    } else {
      doc["Автомобиль_Key"] = "00000000-0000-0000-0000-000000000000";
      doc["Автомобиль"] = null
    }
  } else
  {
    doc["Автомобиль_Key"] = "00000000-0000-0000-0000-000000000000";
    doc["Автомобиль"] = null
  }

};

const transportTasks = DATA["ut_list_Document_ЗаданиеНаПеревозку"] || [];

const sales = (DATA["ut_list_Document_РеализацияТоваровУслуг"] || []).map(doc => {
  const docCopy = JSON.parse(JSON.stringify(doc));
  processDocument(docCopy, "Продажа");
  docCopy["ВидОперации"] = "ПродажаПокупателю"
  return docCopy;
});

const movements = (DATA["ut_list_Document_ПеремещениеТоваров"] || []).map(doc => {
  const docCopy = JSON.parse(JSON.stringify(doc));
  processDocument(docCopy, "Перемещение");
  docCopy["ВидОперации"] = "Перемещение"
  return docCopy;
});

return {"listDocuments": [...sales, ...movements]};
