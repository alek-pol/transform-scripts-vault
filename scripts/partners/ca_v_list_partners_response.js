const enhancePartner = (partner) => ({
  ...partner,
  "Поставщик": true,
  "Покупатель": false
});

return CONTEXT.success
  ? { listPartners: DATA["ca_list_Catalog_Контрагенты"].map(enhancePartner) }
  : DATA;
