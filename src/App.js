import React, { Component } from 'react';
import Looper from './components/Looper';
import reducer from './reducers/index'
import logo from './logo.svg';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './App.css';

const store = createStore(
  reducer
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
