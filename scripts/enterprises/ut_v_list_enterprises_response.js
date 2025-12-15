// ut_v_list_enterprises_response.js

if (!CONTEXT.success) {
  return DATA;
}

const transformEnterprise = (enterprise) => {
  enterprise["ТипСтруктурнойЕдиницы"] = enterprise["ТипСклада"] ?? "";
  delete enterprise["ТипСклада"]
};

const enterprises = DATA["ut_list_Catalog_Склады"].filter(enterprise =>
  enterprise["КонтактнаяИнформация"].some(c => c["Тип"] === "Адрес")
);

enterprises.forEach(enterprise => transformEnterprise(enterprise));

return {
  "listEnterprises": enterprises
}
