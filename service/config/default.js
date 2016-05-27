const baseUris = {
  oauth2      : 'https://api.yaas.io/hybris/oauth2/v1',
  document    : 'https://api.yaas.io/hybris/document/v1',
  minervaDocu : 'localhost:8081'
};

const tenantDetails = {
  tenant      : 'minerva',
  client      : 'minerva.techcomm',
  clientId    : '',
  clientSecret: '',
  collection  : 'events'
};

function getBaseUris() {

  return baseUris;
}

function getTenantDetails() {

  return tenantDetails;
}


export {
  getBaseUris,
  getTenantDetails
};
