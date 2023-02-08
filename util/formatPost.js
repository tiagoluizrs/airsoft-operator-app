/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */

import lodash from 'lodash';
function getItem(object) {
  let new_item = {};
  Object.keys(object).forEach((key) => {
    if (
      object[key] !== '' &&
      object[key] !== null &&
      object[key] !== undefined
    ) {
      new_item[key] = object[key];
    }
  });
  return new_item;
}

function treatObject(array_or_object) {
  if (Array.isArray(array_or_object)) {
    let new_object = [];
    array_or_object.forEach((item) => {
      if (typeof item === 'object') {
        let new_item = getItem(item);
        if (Object.keys(new_item).length !== 0) {
          new_object.push(new_item);
        }
      } else {
        if (typeof item === 'number' || typeof item === 'string') {
          new_object.push(item);
        }
      }
    });
    if (new_object.length === 0) return null;
    return new_object;
  } else {
    let new_item = getItem(array_or_object);
    if (Object.keys(new_item).length === 0) return null;
    return new_item;
  }
}

function treatBody(body) {
  // Desativado com propósito de teste, motivo:
  // https://github.com/nuvorbr/retaguarda/issues/22

  return body;

  let deepCopy_body = lodash.cloneDeep(body);

  Object.keys(body).forEach((key) => {
    console.log(typeof body[key], key, body[key]);
    //treat if is string or is null or is undefined,
    // this is because null is object for javascript
    // (╯°□°)╯︵ ┻━┻
    if (
      typeof body[key] === 'string' ||
      body[key] === null ||
      body[key] === undefined
    ) {
      if (body[key] === '' || body[key] === null || body[key] === undefined) {
        delete deepCopy_body[key];
      }
    } else {
      //treat if is object
      if (typeof body[key] === 'object') {
        let new_object = treatObject(body[key]);
        if (new_object !== null) {
          deepCopy_body[key] = new_object;
        } else {
          delete deepCopy_body[key];
        }
      }
    }
  });

  return deepCopy_body;
}

export { treatBody };
