return CONTEXT.success
  ? {"listOrgs": DATA["ut_list_Catalog_Организации"].map((e) => ({...e, "type": "organization"}))}
  : DATA;
