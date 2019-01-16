import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import {
  getSchema,
  validateSchema
} from './utils';
import {
  isEqual,
  noop
} from 'lodash';

export default class ABIForm extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = { // eslint-disable-line
    abi: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    abi: {
      inputs: []
    },
    onChange: noop,
    onSubmit: noop
  }

  render() {
    let { abi, className, onChange, onSubmit } = this.props;

    return (
      <div className={className}>
        {
          isEqual(abi.type, 'function') &&
          <Form
            showErrorList={false}
            schema={getSchema(abi)}
            validate={(formData, errors) => validateSchema(formData, errors, abi)}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        }
      </div>
    );
  }
}
