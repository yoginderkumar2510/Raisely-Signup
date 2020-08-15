import React from 'react';
import SignUp from './components/Auth/Signup';
import './App.css';

const App = () => {
  return (
    <div className='alignCenter' style={{height: window.innerHeight}}>
      <SignUp />
    </div>
  );
}

export default App;
