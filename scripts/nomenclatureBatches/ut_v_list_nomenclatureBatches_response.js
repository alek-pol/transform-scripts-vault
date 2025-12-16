// ut_v_list_nomenclatureBatches_response.js

if (!CONTEXT.success) {
  return DATA;
}

const batches = (DATA["ut_list_Catalog_СерииНоменклатуры"] || []).map(item => {
  if (item && typeof item === 'object' && "ГоденДо" in item) {
    return {
      ...item,
      "Owner_Key": "00000000-0000-0000-0000-000000000000"
    };
  }
  return item;
});

return { "listBatches": batches };
