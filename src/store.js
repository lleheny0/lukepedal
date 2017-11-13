import { createStore } from 'redux';
import reducer from './reducers';

export default(initialState) => {
  return createStore(reducer, initialState);
}
