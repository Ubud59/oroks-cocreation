import { createStore, combineReducers } from 'redux';
import userReducer from "./user/reducer";
import testReducer from "./test/reducer";
import testsReducer from "./tests/reducer";
import userProfileReducer from './userProfile/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  tests: testsReducer,
  userProfile: userProfileReducer
})

let store = createStore(rootReducer);

store.subscribe(() => console.log("State:",store.getState()))

export default store;
