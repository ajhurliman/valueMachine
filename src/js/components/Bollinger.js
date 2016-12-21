import React from 'react';
import NavLink from './NavLink';
import { browserHistory } from 'react-router';

export default React.createClass({
  handleSubmit(event) {
    event.preventDefault();
    const symbol = event.target.elements[0].value;
    const path = `/bollinger/${symbol}`;
    browserHistory.push(path);
  }, 
  
  render() {
    return (
      <div>
        <h2>Bollinger</h2>

        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder='Stock Symbol' />
          <button type='submit'>Let&#8217;s see it</button>
        </form>

        <ul role='nav'>
          <li><NavLink to='/bollinger/AAPL'>AAPL</NavLink></li>
          <li><NavLink to='/bollinger/KORS'>KORS</NavLink></li>
        </ul>

        
        {this.props.children}
      </div>
    );
  }
});
