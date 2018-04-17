import {
  findType,
  getSchema,
  getType,
  isInt,
  isUint,
  validateValue
} from '../utils';

describe('utils', () => {
  describe('findType', () => {
    it('should return type', () => {
      expect(findType({
        inputs: [{
          name: 'from',
          type: 'address'
        }, {
          name: 'to',
          type: 'address'
        }, {
          name: 'value',
          type: 'uint'
        }]
      }, 'from')).toEqual('address');
    });
    
    it('should return type without []', () => {
      expect(findType({
        inputs: [{
          name: 'from',
          type: 'address[]'
        }, {
          name: 'to',
          type: 'address[]'
        }, {
          name: 'value',
          type: 'uint[]'
        }]
      }, 'from')).toEqual('address');
    });
  });

  describe('getSchema', () => {

    it('should return correct type', () => {
      expect(getSchema({
        'constant': false,
        'inputs': [
          {
            'name': 'spender',
            'type': 'address'
          },
          {
            'name': 'value',
            'type': 'uint256'
          }
        ],
        'name': 'approve',
        'outputs': [
          {
            'name': '',
            'type': 'bool'
          }
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      })).toEqual({
        'properties': {
          'spender': {
            'title': 'Spender', 
            'type': 'string'
          }, 
          'value': {
            'title': 'Value', 
            'type': 'number'

          }
        }, 
        'required': ['spender', 'value'], 
        'title': 'approve', 
        'type': 'object'
      });
    });
  });

  describe('getType', () => {

    it('should return correct type', () => {
      expect(getType('address')).toBe('string');
      expect(getType('boolean')).toBe('boolean');
      expect(getType('int')).toBe('number');
      expect(getType('int')).toBe('number');
      expect(getType()).toBe('string');
    });
  });

  describe('isInt', () => {

    it('should return true for int variations', () => {
      expect(isInt('int')).toBe(true);
      expect(isInt('int8')).toBe(true);
      expect(isInt('int256')).toBe(true);
      expect(isInt('int256[]')).toBe(true);
    });

    it('should return false for non int variations', () => {
      expect(isInt('integer')).toBe(false);
      expect(isInt('uint8')).toBe(false);
      expect(isInt('testuint256')).toBe(false);
    });
  });

  describe('isUint', () => {

    it('should return true for uint variations', () => {
      expect(isUint('uint')).toBe(true);
      expect(isUint('uint8')).toBe(true);
      expect(isUint('uint256')).toBe(true);
      expect(isUint('uint256[]')).toBe(true);
    });

    it('should return false for non uint variations', () => {
      expect(isUint('uinteger')).toBe(false);
      expect(isUint('int8')).toBe(false);
      expect(isUint('testuint256')).toBe(false);
    });
  });
});