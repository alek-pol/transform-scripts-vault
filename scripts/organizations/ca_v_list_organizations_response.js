return CONTEXT.success
  ? {"listOrgs": DATA["ca_list_Catalog_Организации"].map((e) => ({...e, "type": "organization"}))}
  : DATA;
