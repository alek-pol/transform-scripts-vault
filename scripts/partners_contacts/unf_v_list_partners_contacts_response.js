// unf_v_list_partners_contacts_response.js

const removeNavigationLink = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach(key => {
    if (key.includes('@navigationLinkUrl')) {
      delete obj[key];
    }
  });
};

return CONTEXT.success
  ? { "listPartnersContacts": (DATA["unf_list_Catalog_Контрагенты_КонтактнаяИнформация"] || [])
      .map(doc => {
        removeNavigationLink(doc);
        return doc;
      })
    }
  : DATA;
