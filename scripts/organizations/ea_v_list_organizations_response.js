// ea_v_list_organizations_response.js

return CONTEXT.success
  ? {"listOrgs": DATA["ea_list_Catalog_Организации"].map((e) => ({...e, "type": "organization"}))}
  : DATA;
