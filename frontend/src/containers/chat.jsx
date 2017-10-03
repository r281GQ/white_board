import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';

import * as f from '../store/action_creators/chat';

import withAuth from './with_auth';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this._handleWrite = this._handleWrite.bind(this);
    this.state = { message: '' };
  }

  componentDidMount() {


  }

  componentWillUnmount(){
    
  }

  hadnle(msg) {
    this.setState({ msgs: this.state.msgs.concat(msg) });
  }

  _handleWrite() {
    this.props.write(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <div>
          {this.props.msgs.map(msg => <div key={Math.random()}>{msg}</div>)}
        </div>
        <div>
          <input
            type="text"
            value={this.state.message}
            onChange={event => this.setState({ message: event.target.value })}
          />
          <button onClick={this._handleWrite}>Send</button>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  name: PropTypes.string,
  msgs: PropTypes.any,
  d: PropTypes.any,
  write: PropTypes.any,
  rec: PropTypes.any
};

const mapStateToProps = state => {
  return {
    name: state.getIn(['auth', 'name']),
    msgs: state.get('chat')
  };
};
const dfg = dispatch => {
  return {
    write: msg => dispatch(f.writeMessage(msg)),
    d: () => dispatch(f.loadInitial()),
    rec: () => dispatch(f.rec())
  };
};

export default withAuth(connect(mapStateToProps, dfg)(Chat));
