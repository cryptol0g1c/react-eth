import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactEth from '../../src';
import {isEmpty} from 'lodash';
import ReactJson from 'react-json-view';

const logEvent = (abi, event, formData) =>
  console.log(`Form ${abi.name}. Change ${event}. Form data: ${JSON.stringify(formData)}`)

export class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      abi: []
    };
  }

  render() {
    let {abi, parsed} = this.state;
    
    return (
      <div className="playground container">
        <div className="row example-row">
          <div className="col-sm-6">
            {
              parsed
                ? abi.map((abi, index) =>
                  <ReactEth {...{
                    abi,
                    className: 'react-eth-example',
                    key: `index-${index}`,
                    onChange: ({formData}) => logEvent(abi, 'change', formData),
                    onSubmit: ({formData}) => logEvent(abi, 'submit', formData)
                  }} />)
                : null
            }
          </div>
          <div className="col-sm-6">
            <textarea className="playground-abiForm" rows={30} onChange={({target}) => this.handleChange(target)} />
          </div>
        </div>
      </div>
    );
  }

  handleChange({value}) {
    try {
      let parsedAbi = JSON.parse(value);
      this.setState({
        abi: parsedAbi,
        parsed: true
      });
    } catch (error) {
      this.setState({
        parsed: false
      });
    }
  }
}

export default Playground;