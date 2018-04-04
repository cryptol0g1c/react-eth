require('./_index.css');

import React from 'react';
import {render} from 'react-dom';
import erc20Abi from './erc20abi';
import ABIForm from '../src';

const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);

let logEvent = (abi, event, formData) =>
  console.log(`Form ${abi.name}. Change ${event}. Form data: ${JSON.stringify(formData)}`)

render(
  <div>
    {
      erc20Abi.map((abi, index) => <ABIForm {...{
        abi,
        className: 'react-eth-example',
        key: index,
        onChange: ({formData}) => logEvent(abi, 'change', formData),
        onSubmit: ({formData}) => logEvent(abi, 'submit', formData)
      }} />)
    }
  </div>,
  rootDiv
);
