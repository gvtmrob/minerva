function callResolver(res, resolve, reject) {

  if(Array.isArray(res)) {

    const isTrue = res.every((response) => {
      if(!response && !response.status) return false;

      if(response.status < 200 || response.status > 300){
        return false;
      }
      return true;
    });

    return isTrue ? resolve(res) : reject(res);
  }


  if(!res && !res.status) return reject(res.body);

  if(res.status >= 200 && res.status < 300){
    return resolve(res.body);
  }

  return reject(res.body);
}

export {
  callResolver
};
