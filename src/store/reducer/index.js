import {combineReducers} from 'redux'
import viewControl from './viewControl'
import mapControl from './mapControl';

export default combineReducers({viewControl, mapControl})