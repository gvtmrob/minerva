import { getBaseUris, getTenantDetails, createAppPoolObjectData } from 'config';
import { createHeader, createEventsObjectData, createQueryHeaderObject } from './../helpers/creators';
import { callResolver } from './callResolver';

import DocumentService from './../clients/document';

const DOCUMENT = new DocumentService({
  baseUri: getBaseUris().document
});

const TENANT_DETAILS = getTenantDetails();

function createEventObject(token, data) {

  return new Promise((resolve, reject) => {

    const header = createHeader(token, {'Content-Type': 'application/json', 'hybris-metaData': 'name:id'});
    const documentEndpoint = DOCUMENT.resources.tenant(TENANT_DETAILS.tenant).client(TENANT_DETAILS.client).data.type(TENANT_DETAILS.collection);

    documentEndpoint.post(data, header).then((res) => callResolver(res, resolve, reject));
  });
}

function getEventObjects(token, queries) {

  return new Promise((resolve, reject) => {

    const query = {
      q        : queries ? queries : '',
      pageSize : 500
    };
    const header = createHeader(token, {'Content-Type': 'application/json'});
    const documentEndpoint = DOCUMENT.resources.tenant(TENANT_DETAILS.tenant).client(TENANT_DETAILS.client).data.type(TENANT_DETAILS.collection);

    documentEndpoint.get(query, header).then((res) => callResolver(res, resolve, reject));
  });
}

function getEventObject(token, eventId) {

  return new Promise((resolve, reject) => {

    const header = createHeader(token, {'Content-Type': 'application/json'});
    const documentEndpoint = DOCUMENT.resources.tenant(TENANT_DETAILS.tenant).client(TENANT_DETAILS.client).data.type(TENANT_DETAILS.collection).dataId(eventId);

    documentEndpoint.get(null, header).then((res) => callResolver(res, resolve, reject));
  });
}

function updateEventObject(token, eventId, data){

  return new Promise((resolve, reject) => {

    const objectData = data;
    const query = {
      partial : 'true'
    };
    const header = createHeader(token, {'Content-Type': 'application/json'});
    const documentEndpoint = DOCUMENT.resources.tenant(TENANT_DETAILS.tenant).client(TENANT_DETAILS.client).data.type(TENANT_DETAILS.collection).dataId(eventId);

    documentEndpoint.put(objectData, createQueryHeaderObject(query, header)).then((res) => callResolver(res, resolve, reject));
  });

}

function deleteEventObject(token, eventId) {

  return new Promise((resolve, reject) => {

    const header = createHeader(token);
    const documentEndpoint = DOCUMENT.resources.tenant(TENANT_DETAILS.tenant).client(TENANT_DETAILS.client).data.type(TENANT_DETAILS.collection).dataId(eventId);

    documentEndpoint.delete(null, header).then((res) => callResolver(res, resolve, reject));
  });

}

export {
  createEventObject,
  getEventObjects,
  getEventObject,
  updateEventObject,
  deleteEventObject
};
