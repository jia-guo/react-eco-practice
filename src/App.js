import { useState } from 'react';
import Header from './components/Header';
import Counter from './components/Counter';
import ReactReduxHookCounter from './components/ReactReduxHookCounter';
import HookCounter from './components/HookCounter';
import './App.css';

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className='App'>
      <Header />
      <button onClick={() => setShow(!show)}>Switch Counter</button>
      <hr />
      {show && <Counter />}
      <hr />
      {show && <ReactReduxHookCounter />}
      <hr />
      {show && <HookCounter />}
    </div>
  );
}

export default App;
