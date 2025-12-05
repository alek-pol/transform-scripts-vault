return CONTEXT['success']
  ? {"listPartners": DATA["ut_list_Catalog_Контрагенты"].map((e) => ({...e, "Поставщик": true, "Покупатель": false}))}
  : DATA;
