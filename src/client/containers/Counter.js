import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import * as countingActions from '../actions/counting';

@connect(
  state => ({
    counting: state.counting,
    auth: state.auth
  }),
  dispatch => ({
    actions: bindActionCreators(countingActions, dispatch),
  }),
)
class Counter extends React.Component {
  static propTypes = {
    counting: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {}
    this.increment = this.increment.bind(this);
  }

  increment() {
    if (this.props.auth.isAuthenticated) {
      this.props.actions.countInc()
    }
  }

  render() {
    const { countInc, countDec } = this.props.actions;

    return (
      <div>

        <h1>Redux Counter</h1>

        <h3>{this.props.counting}</h3>
        
        <button onClick={this.increment}>+</button>
        
        <button onClick={countDec}>-</button>

      </div>
    );
  }
}

export default Counter;
