# react-eth
# Important: This package is currently on development

## Build status
[![Build Status](https://travis-ci.org/afiorenza/react-eth.svg?branch=master)](https://travis-ci.org/afiorenza/react-eth)

The goal of this repository is to help developers to easily instantiate react forms to contracts ABI.

## Live demo
https://afiorenza.github.io/react-eth/

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
* abi: json. This prop is the interface for abi json.
* className: string.
* onChange: function.
* onSubmit: function.

## Examples
To run examples:
* Clone this repo
* Run `npm install`
* Run `npm run examples`
* Navigate to http://localhost:8080
