// ea_v_list_partners_response.js

const enhancePartner = (partner) => ({
  ...partner,
  "Поставщик": true,
  "Покупатель": true
});

return CONTEXT.success
  ? {"listPartners": DATA["ea_list_Catalog_Контрагенты"].map(enhancePartner)}
  : DATA;
