import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteNews, selectAllData, clearAllData, deleteAllData } from '../Actions/Action'
import { connect } from 'react-redux';
import { fetchNewsData } from '../Actions/Action';
import Search from './Search';
import moment from 'moment';


const Home = ({ news, fetchNewsData }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [ischeck, setischeck] = useState([]);
    const dispatch = useDispatch();

    // const selectedAll = useSelector(state => state.news.selectedAll)
    // console.log('selectall', selectAll);
    // console.log('isCheck', ischeck);

    // console.log('news in container', news);

    // useEffect(() => {
    //     // fetchNewsData()
    //     if (selectAll) {
    //         dispatch(selectAllData(news.map(data => data.id)))
    //     }
    //     else {
    //         dispatch(clearAllData())
    //     }

    // }, [selectAll])

    const onCheckBoxClick = (id) => {
        if (ischeck.includes(id)) {
            let modify = [...ischeck]
            modify.splice(id)
            setischeck(modify)
            setSelectAll(false)

        } else {
            ischeck.length + 1 === news.length && setSelectAll(true)
            setischeck([...ischeck, id])
        }
    }

    const onSelectAll = () => {
        if (!selectAll) {
            setSelectAll(true)
            let modifiedIsChecked = [...ischeck]
            news.forEach(element => {
                !ischeck.includes(element.id) && modifiedIsChecked.push(element.id)

            });
            setischeck(modifiedIsChecked)
        }
        else {
            setSelectAll(false)
            setischeck([])
        }
    }

    return (
        news.loading ? (
            <h2>Loading</h2>
        ) : news.error ? (
            <h2>{news.error}</h2>
        ) : (
            <>
                <h2>HOME PAGE</h2>
                <Link to='/add'><button type="button">Add</button></Link><br /><br />
                {
                    selectAll ? (<button onClick={() => dispatch(deleteAllData())}>Delete All</button>) : null
                }

                <input type="checkbox"
                    checked={selectAll}
                    onClick={onSelectAll} ></input>
                <label>Select All</label>

                {/* <Search /> */}
                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Name</th>
                            <th scope="col">PublishedAt</th>
                            <th scope="col">Phone Numbers</th>
                            {/* <th scope="col"></th> */}
                        </tr>
                    </thead>

                    {news.map((ele = {}) => {
                        {/* console.log(news) */ }
                        const id = ele.id
                        {/* console.log('id is', id) */ }
                        const publish = moment(ele.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
                        {/* console.log('ff', ischeck.includes(id)) */ }
                        return (
                            <>

                                <tr key={ele.id}>
                                    <tr> <input
                                        type="checkbox"
                                        checked={ischeck.includes(id)}
                                        onClick={() => onCheckBoxClick(id)}

                                    ></input></tr>
                                    <td>{ele.title}</td>
                                    <td>{ele.author}</td>
                                    <td>{ele.source?.name}</td>
                                    {/* <td>{ele.name}</td> */}
                                    <td>{publish}</td>
                                    <td>{ele.phnumbers.map((el) => <td>{el}</td>)}</td>

                                    {/* api name rsponse 
                                <td>{data.source?.name}</td>
                                {/* <td>{data.category}</td> */}
                                    <Link to={{
                                        pathname: `edit/${id}`,
                                        news: {
                                            nid: id,
                                            title: ele.title,
                                            author: ele.author,
                                            name: ele.name,
                                            // name: ele.name,
                                            publishedAt: ele.publishedAt,
                                            phnumber: ele.phnumbers
                                        }
                                        //api name response
                                        //name: data.source?.name,
                                    }} ><button type="button">Edit</button></Link>
                                    <button type="button" onClick={() => { dispatch(deleteNews(id)) }} >Delete</button>
                                    {/* <button type="button" onClick={() => dispatch(deleteNews(ele.id))} >Remove</button> */}
                                </tr>

                            </>
                        )
                    })}
                </table>

            </>
        )
    )
}

const mapStateToProps = state => {
    // console.log('state toprops', state, 'news', state.news.news);
    return {
        news: state.news.news

    }
}

const mapDispatchToProps = dispatch => {
    return {
        // fetchNewsData: () => dispatch(fetchNewsData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)

// export default Home
