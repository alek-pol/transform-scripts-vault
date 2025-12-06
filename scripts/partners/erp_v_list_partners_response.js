return CONTEXT.success
  ? {"listPartners": DATA["erp_list_Catalog_Контрагенты"].map((e) => ({...e, "Поставщик": true, "Покупатель": false}))}
  : DATA;
