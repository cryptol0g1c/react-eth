import {capitalize, isEqual, map} from 'lodash';
import {isValidAddress} from 'ethereumjs-util';

const ADDRESS = 'address';
const BOOLEAN = 'boolean';
const NUMBER = 'number';
const OBJECT = 'object';
const STRING = 'string';

const INT_REGEX = /^int*/g;
const UINT_REGEX = /uint*/g;

const ZERO = 0;

export let isInt = type => INT_REGEX.exec(type);

export let isUint = type => UINT_REGEX.exec(type);

export let toRegularCase = camelCasedString => camelCasedString.replace(/([A-Z])/g, ' $1');

export let getType = type => {
  if (ADDRESS) {
    return STRING;
  } else if (BOOLEAN) {
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
    } else if (isUint(type) && value < ZERO) {
      errors[key].addError(`${key} must be grater than zero`);
    }
  });
  
  return errors;
};