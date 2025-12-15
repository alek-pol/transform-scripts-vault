// ca_v_list_registerBarcodes_request.js


return {
  "ca_list_InformationRegister_ШтрихкодыНоменклатуры": {
    "$filter": "Номенклатура/ПодконтрольнаяПродукцияВЕТИС eq true and (startswith(Штрихкод, '46') or startswith(Штрихкод, '046'))",
    "$select": "Номенклатура_Key,Штрихкод"
  }
};
