import { createTokenData, createHeader } from './../helpers/creators';
import { getBaseUris } from 'config';
import OAuth2Service from './../clients/oauth2';
import { callResolver } from './callResolver';

const OAUTH2 = new OAuth2Service({
  baseUri: getBaseUris().oauth2
});

function getToken() {

  return new Promise((resolve, reject) => {

    const tokenEndpoint = OAUTH2.resources.token;

    const tokenData = createTokenData();
    const header = createHeader(null, {'Content-Type': 'application/x-www-form-urlencoded'});

    tokenEndpoint.post(tokenData, header).then((res) => callResolver(res, resolve, reject));
  });
}

export {
  getToken
};
