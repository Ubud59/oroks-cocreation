import { createStore, combineReducers } from 'redux';
import testReducer from "./test/reducer";
import testsReducer from "./tests/reducer";
import participantsReducer from "./participants/reducer";
import userProfileReducer from './userProfile/reducer'


const rootReducer = combineReducers({
  test: testReducer,
  tests: testsReducer,
  participants: participantsReducer,
  userProfile: userProfileReducer

})

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log("State:",store.getState()))

export default store;
