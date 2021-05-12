import axios from 'axios';
import { ADD_NEWS, CLEAR_ALL, DELETE_NEWS, DELETE_SELECTED_DATA, FETCH_NEWS_ERROR, FETCH_NEWS_PENDING, FETCH_NEWS_SUCCESS, GET_NEWS, SELECT_ALL, UPDATE_NEWS } from '../constants/constant';


export function addNews(news) {
    // console.log('addNews',news);
    return {
        type: ADD_NEWS,
        payload: news
    }
}

export function getNews(id) {
    // console.log('in action get news function', id);
    return {
        type: GET_NEWS,
        payload: id
    }

}

export const updateNews = (news) => {
    // console.log('in update action', news);
    return {
        type: UPDATE_NEWS,
        payload: news
    }
}


export const deleteNews = (id) => {
    // console.log('delete', id);
    return {
        type: DELETE_NEWS,
        payload: id
    }
}

//delete selected
export const deleteAllData = () => {
    return {
        type: DELETE_SELECTED_DATA
    }
}

// //select all

// export const selectAllData = (id) => {
//     return {
//         type: SELECT_ALL,
//         payload: id
//     }
// }


// //clear all
// export const clearAllData = () => {
//     return {
//         type: CLEAR_ALL
//     }
// }





export function fetchNewsPending() {
    return {
        type: FETCH_NEWS_PENDING
    }
}

export function fetchNewsSuccess(news) {
    // console.log('fetch',news);
    return {
        type: FETCH_NEWS_SUCCESS,
        news: news
    }
}

export function fetchNewsError(error) {
    return {
        type: FETCH_NEWS_ERROR,
        error: error
    }
}


export const fetchNewsData = () => {
    // console.log('in fetchnews');
    return (dispatch) => {
        dispatch(fetchNewsPending)
        axios.get('https://newsapi.org/v2/everything?q=apple&from=2021-04-28&to=2021-04-28&sortBy=popularity&apiKey=e312b920029441008b7f30a84c125522')
            .then(articles => {
                const news = articles.data.articles
                // console.log('data from api response', news);
                dispatch(fetchNewsSuccess(news))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchNewsError(errorMsg))
            })
    }
}