export const SET_NUMBER_OF_USERS = 'USERWIDGET/SET_NUMBER_OF_USERS';
export const SET_SORT_ORDER = 'USERWIDGET/SET_SORT_ORDER';

const initialState = {
  userCount: 5,
  sortOrder: 'asc'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_OF_USERS:
      return {
        ...state,
        userCount: action.count,
      };

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder === 'dsc' ? 'dsc' : 'asc',
      };


    default:
      return state;
  }
};

// update user count
export const setUserCount = count => (dispatch) => {
  dispatch({
    type: SET_NUMBER_OF_USERS,
    count,
  });
};

// set sorting order
export const setSortOrder = sortOrder => (dispatch) => {
  dispatch({
    type: SET_SORT_ORDER,
    sortOrder,
  });
};
