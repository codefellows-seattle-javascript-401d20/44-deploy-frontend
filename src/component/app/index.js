import './_app.scss';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';

class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> Track your budget! </h1>
            </header>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
