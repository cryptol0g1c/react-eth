import React from 'react';
import PropTypes from 'prop-types';
import ReactEth from '../../src';
import {isEmpty} from 'lodash';
import ReactJson from 'react-json-view';

const logEvent = (abi, event, formData) =>
  console.log(`Form ${abi.name}. Change ${event}. Form data: ${JSON.stringify(formData)}`)

export let ExampleGrid = props => <div className="container">
  {props.abi.map((abi, index) =>
    <div className="row example-row" key={`example-${index}`}>
      <div className="col-sm-6">
        <ReactEth {...{
          abi,
          className: 'react-eth-example',
          onChange: ({formData}) => logEvent(abi, 'change', formData),
          onSubmit: ({formData}) => logEvent(abi, 'submit', formData)
        }} />
      </div>
      <div className="col-sm-6">
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

ExampleGrid.propTypes = {
  abi: PropTypes.array
}

ExampleGrid.defaultProps = {
  abi: []
}

export default ExampleGrid;