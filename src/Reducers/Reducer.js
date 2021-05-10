import { ADD_NEWS, CLEAR_ALL, DELETE_NEWS, DELETE_SELECTED_DATA, FETCH_NEWS_ERROR, FETCH_NEWS_PENDING, FETCH_NEWS_SUCCESS, GET_NEWS, SELECT_ALL, UPDATE_NEWS } from "../constants/constant"

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
                news: state.news.map((news, id) => id === action.payload.id ? action.payload : news)
            }

        case DELETE_NEWS:
            // console.log('action', action.payload);
            return {
                ...state,
                news: state.news.filter((n) => n.id !== action.payload)
            }

        case DELETE_SELECTED_DATA:
            return {
                ...state,
                news: []
            }

        case SELECT_ALL:
            return {
                ...state,
                selectedAll: action.payload
            }

        case CLEAR_ALL:
            return {
                ...state,
                selectedAll: []
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
// export const getNews = state => state.news;
// export const getNewsPending = state => state.loading;
// export const getNewsError = state => state.error;
