// Request transformation
return {
  "unf_list_Catalog_Организации": {
    "$select": "Ref_Key,Description,ИНН"
  }
};
