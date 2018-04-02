import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

export default class ABIForm extends Component {
  constructor (props) {
    super(props);
  }

  getSchema(abi) {
    return {
      title: abi.name,
      type: 'object',
      required: (abi.inputs || []).map(({name}) => name),
      properties: {
        spender: {type: "string", title: "Sepnder", default: ""},
        value: {type: "number", title: "Value", default: 0}
      }
    };
  }

  render () {
    let {abi} = this.props;

    return (
      <Form
        schema={this.getSchema(abi)}
      />
    );
  }
}
