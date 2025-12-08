return CONTEXT.success
  ? {"listOrgs": DATA["erp_list_Catalog_Организации"].map((e) => ({...e, "type": "organization"}))}
  : DATA;
