import { ADD_NEWS, DELETE_NEWS, DELETE_SELECTED_DATA, FETCH_NEWS_ERROR, FETCH_NEWS_PENDING, FETCH_NEWS_SUCCESS, GET_NEWS, UPDATE_NEWS } from "../constants/constant"

const initialstate = {
    loading: false,
    error: '',
    news: [],
    selectedAll: []
}

const Reducer = (state = initialstate, action) => {
    // console.log('action', action);
    switch (action.type) {
        case ADD_NEWS:
            // console.log('action', action.payload);
            return {
                news: [action.payload, ...state.news],
            }

        case GET_NEWS:
            // console.log('action', state);
            return {
                ...state
            }

        case UPDATE_NEWS:
            // console.log('in update reducer', action.payload);
            return {
                ...state,
                news: state.news.map((n, id) => n.id === action.payload.id ? action.payload : news)
            }

        case DELETE_NEWS:
            // console.log('action', action.payload);
            return {
                ...state,
                news: state.news.filter((n) => n.id !== action.payload)
            }

        case DELETE_SELECTED_DATA:
            // console.log('action', action.payload);

            return {
                ...state,
                news: []
            }


        case FETCH_NEWS_PENDING:
            // console.log('in pending case' , action.payload);
            return {
                ...state,
                loading: true
            }

        case FETCH_NEWS_SUCCESS:
            // console.log('in success case' ,'hi', state, 'action',action);
            return {
                ...state,
                loading: false,
                news: action.news
            }

        case FETCH_NEWS_ERROR:
            // console.log('in error case' , action.payload);
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}

export default Reducer

