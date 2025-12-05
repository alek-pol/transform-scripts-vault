// Request transformation
return {
  "unf_list_Catalog_Контрагенты": {
    "$filter": "ИНН ne ''",
    "$select": "Ref_Key,Description,ИНН,DeletionMark,Поставщик,Покупатель"
  }
};
