import React from 'react';
import {render} from 'react-dom';
import erc20Abi from './erc20abi';
import ReactEth from '../src';

const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);

render(
  <ReactEth
    abi={erc20Abi[0]}
  />, 
  rootDiv
);
