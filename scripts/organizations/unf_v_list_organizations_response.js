// Response transformation
if (!CONTEXT['success']) {
  return DATA;
}

DATA = {
  "listOrgs": DATA.unf_list_Catalog_Организации
};
