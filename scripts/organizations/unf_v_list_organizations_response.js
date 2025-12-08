return CONTEXT.success
  ? {"listOrgs": DATA["unf_list_Catalog_Организации"].map((e) => ({...e, "type": "organization"}))}
  : DATA;
