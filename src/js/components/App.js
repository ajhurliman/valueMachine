import React from 'react';
import NavLink from './NavLink';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role='nav'>
          <li><NavLink to='/bollinger'>Bollinger</NavLink></li>
          <li><NavLink to='/correlationReducer'>Correlation Reducer</NavLink></li>
        </ul>

        {this.props.children}
      </div>
    );
  }
});
