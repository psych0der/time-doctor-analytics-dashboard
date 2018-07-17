import Types from '../Types';
export const SET_WIDGET_DROPZONE = 'WIDGET_CONTAINER/SET_WIDGET_DROPZONE';
export const EMPTY_CONTAINER = 'WIDGET_CONTAINER/EMPTY_CONTAINER';

export const MOVE_WIDGET = 'WIDGET_CONTAINER/MOVE_WIDGET';

/*
    This will store mapping of container id with widget type
    For eg container-1:user_widget
    Currently it is empty as no widget is present on app start
*/
const initialState = {
    'widget-container-1': Types.USER_WIDGET
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WIDGET_DROPZONE:
            return {
                ...state,
                [action.containerKey]: action.widgetType,
            };

        case EMPTY_CONTAINER:
            let { [action.containerKey]: deletedItem, ...rest } = state;
            return rest;

        case MOVE_WIDGET:
            let { [action.previousContainer]: widgetId, ...remaining } = state;
            return { ...remaining,
                [action.newContainer]: action.widgetType
            };

        default:
            return state;
    }
};

// update user count
export const setWidgetDropZone = (containerKey, widgetType) => (dispatch) => {
    dispatch({
        type: SET_WIDGET_DROPZONE,
        containerKey,
        widgetType
    });
};

// set sorting order
export const emptyContainer = containerkey => (dispatch) => {
    dispatch({
        type: EMPTY_CONTAINER,
        containerkey,
    });
};

export const moveWidget = (widgetType, previousContainer, newContainer) => (dispatch) => {
    dispatch({
        type: MOVE_WIDGET,
        previousContainer,
        newContainer,
        widgetType
    })
}
