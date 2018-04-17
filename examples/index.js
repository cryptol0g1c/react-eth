require('./_index.css');

import React from 'react';
import {render} from 'react-dom';
import {ExampleGrid, Footer, Playground} from './components/'
import arraysAbi from './abis/arrays';
import erc20Abi from './abis/erc20';

const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);

render(
  <div>
    <div className="body">
      <div className="container">
        <h1>ERC20</h1>
        <ExampleGrid abi={erc20Abi} />
        <br />
        <h1>With arrays</h1>
        <ExampleGrid abi={arraysAbi} />
        <h1>Playground</h1>
        <h3>Test your own ABI</h3>
        <Playground />
      </div>
    </div>
    <Footer />
  </div>,
  rootDiv
);
