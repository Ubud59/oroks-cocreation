import { createStore, combineReducers } from 'redux';
import userReducer from "./user/reducer";
import testReducer from "./test/reducer";
// import profileReducer from "./profile/reducer";
// import myTestsReducer from "./myTests/reducer";

const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer
  // profile: profileReducer,
  // myTests: myTestsReducer
})

let store = createStore(rootReducer);

store.subscribe(() => console.log("State:",store.getState()))

export default store;
