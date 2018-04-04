import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import {getSchema, validateSchema} from './utils';

export default class ABIForm extends Component {
  constructor (props) {
    super(props);
  }

  static propTypes = { // eslint-disable-line
    abi: PropTypes.object,
    className: PropTypes.string
  }

  render () {
    let {abi, className} = this.props;

    return (
      <Form
        className={className}
        showErrorList={false}
        schema={getSchema(abi)}
        validate={(formData, errors) => validateSchema(formData, errors, abi)}
      />
    );
  }
}
