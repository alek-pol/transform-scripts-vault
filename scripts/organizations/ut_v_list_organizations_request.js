// Request transformation
return {
  "ut_list_Catalog_Организации": {
    "$select": "Ref_Key,Description,ИНН"
  }
};
