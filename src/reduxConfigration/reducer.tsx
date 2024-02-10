import {combineReducers} from 'redux';
import rockSlice from './slice/rockSlice';

const rootReducer = combineReducers({
  rockSlice: rockSlice,
});

export default rootReducer;