import { combineReducers } from 'redux';
import assignments from "./slices/assignments"


const rootReducer = combineReducers({
  assignments
});

export default rootReducer;