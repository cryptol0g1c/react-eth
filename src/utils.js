import {
  capitalize,
  get,
  isArray,
  isEqual,
  map
} from 'lodash';
import {isValidAddress} from 'ethereumjs-util';

const ADDRESS = 'address';
const ARRAY = 'array';
const BOOLEAN = 'boolean';
const NUMBER = 'number';
const OBJECT = 'object';
const STRING = 'string';

const ZERO = 0;

export let isInt = type => (/^int\d{0,3}(\[\])?$/g).test(type);

export let isUint = type => (/^uint\d{0,3}(\[\])?$/g).test(type);

export let toRegularCase = camelCasedString => camelCasedString.replace(/([A-Z])/g, ' $1');

export let isArrayType = (type = '') => type.includes('[]');

export let isAddress = (type = '') => isEqual(ADDRESS, type);

export let isBoolean = type => isEqual(BOOLEAN, type);

export let getType = type => {
  if (isAddress(type)) {
    return STRING;
  } else if (isBoolean(type)) {
    return BOOLEAN;
  } else if (isArrayType(type)) {
    return ARRAY;
  } else if (isInt(type) || isUint(type)) {
    return NUMBER;
  } else {
    return STRING;
  }
};

export let getItems = type => {
  if (isAddress(type)) {
    return {
      type: STRING
    };
  } else if (isBoolean(type)) {
    return {
      type: BOOLEAN
    };
  } else if (isInt(type) || isUint(type)) {
    return {
      type: NUMBER
    };
  } else {
    return {
      type: STRING
    };
  }
};

export let getProperties = abi => {
  let properties = {};

  (abi.inputs || []).map(({name , type}) => {
    properties[name] = {
      title: capitalize(name),
      type: getType(type)
    };

    if (isArrayType(type)) {
      properties[name].items = getItems(type);
    }
  });

  return properties;
};

export let getSchema = abi => ({
  title: abi.name,
  type: OBJECT,
  required: (abi.inputs || []).map(({name}) => name),
  properties: getProperties(abi)
});

export let findType = (abi, key) => get((abi.inputs || []).find(({name}) => isEqual(name, key)), 'type', '').replace('[]', '');

export let validateValue = (value, key, errors, type) => {
  if (isEqual(type, ADDRESS)) {
    isValidAddress(value) ? null : errors[key].addError(`${key} not match address format`);
  }

  if (isUint(type)) {
    if (value < ZERO) {
      errors[key].addError(`${key} should be grater than zero`);
    }
  }
};

export let validateSchema = (formData, errors, abi) => {
  map(formData, (value, key) => {
    let type = findType(abi, key);

    isArray(value)
      ? value.map(v => validateValue(v, key, errors, type))
      : validateValue(value, key, errors, type);
  });

  return errors;
};
