import { createStore, combineReducers } from 'redux';
import userReducer from "./user/reducer";
import testReducer from "./test/reducer";
import testsReducer from "./tests/reducer";
import participantsReducer from "./participants/reducer";
import profileReducer from "./profile/reducer";
import userProfileReducer from './userProfile/reducer'


const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  tests: testsReducer,
  participants: participantsReducer,
  profile: profileReducer,
  userProfile: userProfileReducer

})

let store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log("State:",store.getState()))

export default store;
