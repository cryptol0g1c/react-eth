import React from 'react';
import {shallow} from 'enzyme';
import ReactEth from '../';
import Form from 'react-jsonschema-form';

describe('ReactEth', () => {
  it('should render component', () => {
    const component = shallow(<ReactEth />);
    
    expect(component.type()).toBe('div');
  });

  it('should render Form if abi.inputs has parameters', () => {
    const abiExample = {
      "constant": false,
      "inputs": [
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    };
    const component = shallow(<ReactEth abi={abiExample} />);

    expect(component.children().type()).toBe(Form);
  });
});