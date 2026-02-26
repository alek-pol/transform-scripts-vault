// unf_v_list_incomingDocuments_request.js

const params = {
  "$expand": "Автор,Организация,Подразделение,СтруктурнаяЕдиница,Контрагент",
  "$select": "Ref_Key,Number,Date,НомерВходящегоДокумента,ДатаВходящегоДокумента,Договор_Key,ВидОперации,Автор_Key,Автор/Description,Запасы/Ref_Key,Запасы/LineNumber,Запасы/Номенклатура_Key,Запасы/Количество,Запасы/ЕдиницаИзмерения,Запасы/ЕдиницаИзмерения_Type,Запасы/Партия_Key,Организация_Key,Организация/Description,Подразделение_Key,Подразделение/Description,СтруктурнаяЕдиница_Key,СтруктурнаяЕдиница/Description,Контрагент_Key,Контрагент/Description,DeletionMark"
};

if (typeof DATA["$filter"] === 'string') {
  params["$filter"] = DATA["$filter"];
}

return {
  "unf_list_Document_ПриходнаяНакладная": params
};
