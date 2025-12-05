// Request transformation
return {
  "erp_list_Catalog_Организации": {
    "$select": "Ref_Key,Description,ИНН"
  }
};
