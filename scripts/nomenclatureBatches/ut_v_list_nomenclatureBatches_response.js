// ut_v_list_nomenclatureBatches_response.js

if (!CONTEXT.success) {
  return DATA;
}

const batches = (DATA["ut_list_Catalog_СерииНоменклатуры"] || []).map(item => {
  if (!item || typeof item !== 'object') {
    return item;
  }

  const newItem = { ...item };

  if (typeof newItem["Description"] === 'string') {
    const idx = newItem["Description"].indexOf(" до");
    if (idx !== -1) {
      newItem["Description"] = newItem["Description"].substring(0, idx);
    }
  }

  if ("ГоденДо" in newItem) {
    newItem["Owner_Key"] = "00000000-0000-0000-0000-000000000000";
  }

  return newItem;
});

return { "listBatches": batches };
