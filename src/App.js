import React, { Component } from 'react';
import Looper from './components/Looper';
import rootReducer from './reducers/root'
// import logo from './logo.svg';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './App.css';
import { init } from './utils/tone'

init()

const store = createStore(
  rootReducer
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Looper />
      </Provider>
    );
  }
}

export default App;
