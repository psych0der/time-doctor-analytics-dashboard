import {
    combineReducers
} from 'redux'
import userWidget from './userWidget';
import widgetContainer from './widgetContainer';

export default combineReducers({
    userWidget,
    widgetContainer
})