import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteNews, deleteAllData } from '../Actions/Action'
import { connect } from 'react-redux';
import moment from 'moment';


const Home = ({ news }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [ischeck, setischeck] = useState([]);
    const dispatch = useDispatch();

    const id = news.map((ele) => ele.id)

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

    const handleDelete = (id) => {

        if (ischeck == id) {

            const newList = [...ischeck]
            news.splice(id)
            setischeck(newList)

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
                {ischeck.length > 0 ?
                    <>
                        <button onClick={() => handleDelete(ischeck, id)}>Delete All</button>

                        <input type="checkbox"
                            checked={selectAll}
                            onClick={onSelectAll} ></input>
                        <label>Select All</label>
                    </> : null
                }



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
                        const id = ele.id
                        const publish = moment(ele.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
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

