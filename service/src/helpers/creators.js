import { getTenantDetails } from 'config';


function createEventsObjectData() {

  return {
    type,
    name,
    description,
    website,
    startDate,
    endDate,
    address,
    latitude,
    longitude

  };
}

function createTokenData() {

  const tenantDetails = getTenantDetails();

  return {
    client_id     : tenantDetails.clientId,
    client_secret : tenantDetails.clientSecret,
    grant_type    : 'client_credentials',
    scope         : `hybris.tenant=${tenantDetails.tenant} hybris.document_view hybris.document_manage`
  };
}

function createHeader(token, extraFields = {}) {

  let header = {};

  if(token) header.Authorization = `Bearer ${token}`;

  header = Object.assign(extraFields, header);

  return {
    headers: header
  };
}

/**
 * Sometimes when calling a service with PUT or POST you need to specify
 * in one object query params (like that it is a partial update) with headers
 * @param {Object} [query] - Object with query param attributes
 * @param {Object} [header] - Object with 'headers' attribute that contains object with headers
 * @return {Object} - Object with 2 main attributes, query and headers
 */
function createQueryHeaderObject(query, header) {

  header.query = query;

  return header;
}

export {
  createTokenData,
  createHeader,
  createQueryHeaderObject
};
