import React, { Component } from 'react';
import { connect } from 'react-redux';

import Value from './value';
import Control from './control';

import * as actions from '../actions';

 
class Counter extends Component {

    constructor(props) {
        super(props);
        this.setRandomColor = this.setRandomColor.bind(this);
    }

    setRandomColor() {
        const color = [
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200),
            Math.floor((Math.random()*55) + 200)
        ];

        this.props.handleSetColor(color);
    }

    render(){
        
        const color = this.props.color;
        const style = {
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        }

        return (
            <div style={style}>
              <Value number={this.props.number}/>
              <Control 
                onPlus={this.props.handleIncrement} 
                onSubtract={this.props.handleDecrement} 
                onRandomizeColor={this.setRandomColor}
              />
            </div>
        );
    }
}

// 인수 state는 redux의 state 임
const mapStateToProps = (state) => {
    console.log(state)
    return {
        // props 에 매핑할 state 를 설정
        number: state.counter.number,
        color: state.ui.color
    };
}

const mapDispatchToProps = (dispatch) => {
    // 방법 1.
    // props 명을 지정할 수 없음. actions 생성자 함수명으로 됨
    // return bindActionsCreators(actions, dispatch);

    // 방법 2.
    return {
        // props 에 action 을 dispatch 하는 함수를 연결
        handleIncrement: () => { dispatch(actions.increment()) },
        handleDecrement: () => { dispatch(actions.decrement()) },
        handleSetColor: (color) => { dispatch(actions.setColor(color)) },
    };
}

// option이 없으면 컴포넌트에서 store 에 접근 시,
// this.props.store.getState().count.number 
// export default connect()(Counter);

// mapping 을 하였으므로 컴포넌트에서 store 에 접근 시,
// this.props.number
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
