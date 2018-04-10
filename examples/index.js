require('./_index.css');

import React from 'react';
import ReactJson from 'react-json-view';
import {render} from 'react-dom';
import erc20Abi from './erc20abi';
import ReactEth from '../src';
import {isEmpty} from 'lodash';

const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);

let logEvent = (abi, event, formData) =>
  console.log(`Form ${abi.name}. Change ${event}. Form data: ${JSON.stringify(formData)}`)

render(
  <div className="body">
    <h1 className="header">react-eth</h1>
    <div className="container">
      {erc20Abi.map((abi, index) =>
        <div className="row example-row" key={`example-${index}`}>
          <div className="col">
            <ReactEth {...{
              abi,
              className: 'react-eth-example',
              onChange: ({formData}) => logEvent(abi, 'change', formData),
              onSubmit: ({formData}) => logEvent(abi, 'submit', formData)
            }} />
          </div>
          <div className="col">
            {
              !isEmpty(abi.inputs) && <ReactJson enableClipboard={false} src={abi} theme="monokai" style={{
                maxHeight: '30rem',
                overflowY: 'auto'          
              }} />
            }
          </div>
        </div>
      )}
    </div>
  </div>,
  rootDiv
);
