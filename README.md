# react-eth
# Important: This package is currently on development

## Build status
[![Build Status](https://travis-ci.org/afiorenza/react-eth.svg?branch=master)](https://travis-ci.org/afiorenza/react-eth)

The goal of this package is to help developers to easily create react forms from smart-contracts ABI.

## Live demo
https://afiorenza.github.io/react-eth/

The live demo uses [Bootstrap](https://getbootstrap.com/). But feel free to give your own styling.

## Usage
```
import ReactEth from 'react-eth';

const abi = {
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

<ReactEth abi={abi}>
```

## Props
* abi: json.
* className: string.
* onChange: function.
* onSubmit: function.

## Examples
* Clone this repo
* Run `npm install`
* Run `npm run examples`
* Navigate to http://localhost:8080