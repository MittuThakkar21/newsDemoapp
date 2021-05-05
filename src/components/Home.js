import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteNews } from '../Actions/Action'
import { connect } from 'react-redux';
// import { fetchNewsData } from '../Actions/Action';
import Search from './Search';
import JSONDATA from '../Data/data.json'
import ReactPaginate from 'react-paginate';



const Home = ({ news }) => {
    // console.log('news in container', news);
    const PER_PAGE = 5;
    const dispatch = useDispatch();

    // const [data, setData] = useState(JSONDATA);
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(news.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    // useEffect(() => {
    //     // fetchNewsData()
    //     setData(JSONDATA)
    // }, [])

    return (
        news.loading ? (
            <h2>Loading</h2>
        ) : news.error ? (
            <h2>{news.error}</h2>
        ) : (
            <div>
                <h2>HOME PAGE</h2>
                <Link to='/add'><button type="button">Add</button></Link><br /><br />

                <Search />
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Name</th>
                            <th scope="col">PublishedAt</th>
                            <th scope="col">Phone Numbers</th> */}
                            {/* <th scope="col"></th> */}
                        </tr>
                    </thead>

                    {news.slice(offset, offset + PER_PAGE).map((ele = {}, id) => {
                        {/* console.log(JSONDATA) */ }
                        return (
                            <tr key={ele.id}>
                                <td>{ele.title}</td>
                                <td>{ele.author}</td>
                                <td>{ele.source?.name}</td>
                                {/* <td>{ele.name}</td> */}
                                <td>{ele.publishedAt}</td>
                                {/* <td>{ele.phnumbers.map((ele) => <td>{ele}</td>)}</td> */}

                                {/* api name rsponse 
                                <td>{data.source?.name}</td>
                                {/* <td>{data.category}</td> */}
                                <Link to={{
                                    pathname: `edit/${id}`,
                                    news: {
                                        nid: id,
                                        title: ele.title,
                                        author: ele.author,
                                        name: ele.source?.name,
                                        // name: ele.name,
                                        publishedAt: ele.publishedAt,
                                        // phnumber: ele.phnumbers
                                    }
                                    //api name response
                                    //name: data.source?.name,
                                }} ><button type="button">Edit</button></Link>
                                <button type="button" onClick={() => dispatch(deleteNews(id))} >Delete</button>
                            </tr>
                        )
                    })}
                </table>
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                />
            </div>
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
