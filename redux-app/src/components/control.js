import React, { Component, PropTypes } from 'react';

const propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRandomizeColor: PropTypes.func
}

const defaultProps = {
  onPlus: createWaring('onPlus'),
  onSubtract: createWaring('onSubtract'),
  onRandomizeColor: createWaring('onRandomizeColor'),
}

// 경고를 출력하는 함수
function createWaring(funcName) {
  return () => console.warn(funcName + ' is not defined');
}

class Control extends Component {

    render(){

        return (
            <div>
              <button onClick={this.props.onPlus}>+</button>
              <button onClick={this.props.onSubtract}>-</button>
              <button onClick={this.props.onRandomizeColor}>Random Color</button>
            </div>
        );
    }
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
