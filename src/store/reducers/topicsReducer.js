import types from '../types/topicsTypes';
const defaultState = {
    type: '',
    init: false,
    pageSize: 20,
    list: []
}
export default topicsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.TOPICS_INIT:
            return Object.assign({}, state, {init: true});
        default:
            return state;
    }
}