// unf_v_list_incomingDocuments_response.js

if (!CONTEXT['success']) {
  return DATA;
}

const removeNavigationLink = (obj) => {
  if (!obj || typeof obj !== 'object') return;
  Object.keys(obj).forEach(key => {
    if (key.includes('@navigationLinkUrl')) {
      delete obj[key];
    }
  });
};


const processDocument = (doc) => {
  if (!doc || typeof doc !== 'object') return;
  removeNavigationLink(doc);
};


return {
  "listDocuments": (DATA["unf_list_Document_ПриходнаяНакладная"] || []).map(doc => {
    const docCopy = JSON.parse(JSON.stringify(doc));
    processDocument(docCopy);

    return docCopy;
  })
};
