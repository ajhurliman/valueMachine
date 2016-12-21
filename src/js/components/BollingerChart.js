import React from 'react';

export default React.createClass({
  componentDidMount() {
    console.log('mounted');
  },
  componentWillReceiveProps() {
    console.log('will receive props');
  },
  render() {
    return <div>bollinger chart for {this.props.params.symbol}</div>;
  }
});
