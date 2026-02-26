// ut_v_list_incomingDocuments_request.js

params = {
  "$select": "Ref_Key,Number,Date,НомерВходящегоДокумента,ДатаВходящегоДокумента,Договор_Key,ХозяйственнаяОперация,Автор_Key,Автор/Description,Товары/Ref_Key,Товары/LineNumber,Товары/Номенклатура_Key,Товары/Количество,Товары/Упаковка_Key,Товары/Серия_Key,Организация_Key,Организация/Description,Подразделение_Key,Подразделение/Description,Склад_Key,Склад/Description,Контрагент_Key,Контрагент/Description,DeletionMark,ПеревозчикПартнер_Key,ПеревозчикПартнер/Description,ПеревозчикПартнер/Ref_Key",
  "$expand": "Автор,Организация,Подразделение,Склад,Контрагент,ПеревозчикПартнер"
}


if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA['$filter'].replaceAll("СтруктурнаяЕдиница_Key", "Склад_Key")
}

return {
  "ut_list_Document_ПриобретениеТоваровУслуг": params
}
