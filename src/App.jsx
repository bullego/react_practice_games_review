import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './app.scss';

const App = () => {
  return (
    <div className='app'>
      <Route path={['/game/:id', '/']}>
        <HomePage/>
      </Route>
    </div>
  );
}

export default App;