// Request transformation
return {
  "ea_list_Catalog_Организации": {
    "$select": "Ref_Key,Description,ИНН"
  }
};
