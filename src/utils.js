import {
  capitalize,
  isEqual,
  map
} from 'lodash';
import {isValidAddress} from 'ethereumjs-util';

const ADDRESS = 'address';
const BOOLEAN = 'boolean';
const NUMBER = 'number';
const OBJECT = 'object';
const STRING = 'string';

const ZERO = 0;

export let isInt = type => (/^int\d{0,3}$/g).test(type);

export let isUint = type => (/^uint\d{0,3}$/g).test(type);

export let toRegularCase = camelCasedString => camelCasedString.replace(/([A-Z])/g, ' $1');

export let getType = type => {
  if (isEqual(ADDRESS, type)) {
    return STRING;
  } else if (isEqual(BOOLEAN, type)) {
    return BOOLEAN;
  } else if (isInt(type) || isUint(type)) {
    return NUMBER;
  } else {
    return STRING;
  }
};

export let getProperties = abi => {
  let properties = {};
    
  (abi.inputs || []).map(({name , type}) => {
    properties[name] = {
      title: capitalize(name),
      type: getType(type)
    };
  });

  return properties;
};

export let getSchema = abi => ({
  title: abi.name,
  type: OBJECT,
  required: (abi.inputs || []).map(({name}) => name),
  properties: getProperties(abi)
});

export let findType = (abi, key) => abi.inputs.find(({name}) => isEqual(name, key));

export let validateSchema = (formData, errors, abi) => {
  map(formData, (value, key) => {
    let {type} = findType(abi, key);
    
    if (isEqual(type, ADDRESS)) {
      isValidAddress(value) ? null : errors[key].addError(`${key} not match address format`);
    }
    
    if (isUint(type)) {
      if (value < ZERO) {
        errors[key].addError(`${key} should be grater than zero`);
      }
    }
  });
  
  return errors;
};