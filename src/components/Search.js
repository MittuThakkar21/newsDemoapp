import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { deleteNews } from '../Actions/Action'
import JSONDATA from '../Data/data.json'
import ReactPaginate from 'react-paginate';


const Search = () => {

    const PER_PAGE = 5;

    const [searchtitle, setsearchTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isFilter, setIsFilter] = useState(false);

    // const [data, setData] = useState(JSONDATA);
    const [currentPage, setCurrentPage] = useState(0);


    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(JSONDATA.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const dispatch = useDispatch();
    // console.log('start date' ,startDate);
    const renderFilterData = () => {
        let filteredData = JSONDATA.filter((val) => {

            if (searchtitle == "") {
                return val
            } else if (val.title.toLowerCase().includes(searchtitle.toLowerCase())) {
                return val
            }
        })
        if (isFilter) {
            filteredData = filteredData.filter((val) => {

                const sdate = moment(startDate)
                const edate = moment(endDate)
                const publishedAt = moment(val.publishedAt)

                return publishedAt.isSameOrAfter(sdate) && publishedAt.isSameOrBefore(edate)
            })
        }
        filteredData = filteredData.slice(offset, offset + PER_PAGE)

        // console.log('filter data', filteredData);
        filteredData = filteredData.map((data = {}, id) => {
            const publish = moment(data.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
            // console.log('publish', publish);
            {/* console.log(data) */ }
            return (
                <>
                    <tr key={data.id}>
                        <td>{data.title}</td>
                        <td>{data.author}</td>
                        <td>{data.source?.name}</td>
                        <td>{data.name}</td>
                        <td>{publish}</td>

                        <button>Edit</button>
                        <button onClick={() => dispatch(deleteNews(id))} >Delete</button>
                    </tr>
                </>
            )

        })
        return filteredData;
    }

    const filterData = () => {
        setIsFilter(true)
    }

    return (
        <div>
            <div>
                <div>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                    // minDate={new Date()}
                    />
                    <button onClick={filterData}>Filter</button>
                </div><br />
                <input type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setsearchTitle(e.target.value)
                    }}

                ></input>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Name</th>
                        <th scope="col">PublishedAt</th>
                        <th scope="col">Phone Numbers</th>

                    </tr>
                </thead>
                {renderFilterData()}

            </table>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
            />
        </div>
    )

}


export default Search
