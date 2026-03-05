// ut_v_list_outcomingDocuments_request.js

const salesParams = {
  "$expand": "Организация,ПеревозчикПартнер,Контрагент,Склад,Автор",
  "$select": "Ref_Key,Number,Date,ХозяйственнаяОперация,Автор_Key,Автор/Description,Товары/LineNumber,Товары/Ref_Key,Товары/Номенклатура_Key,Товары/Количество,Товары/Упаковка_Key,Товары/Склад_Key,Товары/СтатусУказанияСерий,Серии/Ref_Key,Серии/LineNumber,Серии/Серия_Key,Серии/Склад_Key,Серии/Количество,Серии/Номенклатура_Key,ШтрихкодыУпаковок,ПеревозчикПартнер_Key,ПеревозчикПартнер/Description,ПеревозчикПартнер/Ref_Key,Контрагент_Key,Контрагент/Description,Организация_Key,Организация/Description,Склад,Склад/Description,АдресДоставки,СпособДоставки,Склад_Key"
};

const movementsParams = {
  "$expand": "Организация,ПеревозчикПартнер,СкладОтправитель,СкладПолучатель,Автор",
  "$select": "Ref_Key,Number,Date,ХозяйственнаяОперация,Автор_Key,Автор/Description,Товары/LineNumber,Товары/Ref_Key,Товары/Номенклатура_Key,Товары/Количество,Товары/Упаковка_Key,Товары/СтатусУказанияСерий,Серии/Ref_Key,Серии/LineNumber,Серии/Серия_Key,Серии/Количество,Серии/Номенклатура_Key,ШтрихкодыУпаковок,ПеревозчикПартнер_Key,ПеревозчикПартнер/Description,ПеревозчикПартнер/Ref_Key,Организация_Key,Организация/Description,СкладОтправитель_Key,СкладОтправитель/Description,СкладПолучатель_Key,СкладПолучатель/Description,АдресДоставки,СпособДоставки"
}

const transportParams = {
  "$expand": "ТранспортноеСредство",
  "$select": "Ref_Key,Number,Date,Распоряжения/Распоряжение,Распоряжения/Перевозчик_Key,Статус,Операция,ТранспортноеСредство"
}

// Доработать - проверка, что filterParts существует и не пустой
if ("filterParts" in DATA) {
  salesParams["$filter"] = "Posted eq true and "
    + "(Товары/Номенклатура/ОсобенностьУчета eq 'ПодконтрольнаяПродукцияВЕТИС'"
    + " or Товары/Номенклатура/ОсобенностьУчета eq 'МолочнаяПродукцияПодконтрольнаяВЕТИС')"
    // + "(Товары/Номенклатура/ПодконтрольнаяПродукцияВЕТИС eq true)"
    + " and Date ge datetime'" + DATA.filterParts.documentDateTime + "'"

  movementsParams["$filter"] = "Posted eq true and "
    + "(Товары/Номенклатура/ОсобенностьУчета eq 'ПодконтрольнаяПродукцияВЕТИС'"
    + " or Товары/Номенклатура/ОсобенностьУчета eq 'МолочнаяПродукцияПодконтрольнаяВЕТИС')"
    // "Posted eq true and (Товары/Номенклатура/ПодконтрольнаяПродукцияВЕТИС eq true)"
    + " and Date ge datetime'" + DATA.filterParts.documentDateTime + "'"

  transportParams["$filter"] = "Posted eq true"
    + " and Date ge datetime'" + DATA.filterParts.transportDataTime + "'"
}

return {
  "ut_list_Document_РеализацияТоваровУслуг": salesParams,
  "ut_list_Document_ПеремещениеТоваров": movementsParams,
  "ut_list_Document_ЗаданиеНаПеревозку": transportParams
};
