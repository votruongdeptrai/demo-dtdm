import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import './style.css'


const Pagination = (props) => {

    // const perPage = 3
    const { perPage, data, renderData } = props
    const [pageNumber, setPageNumber] = useState(0)
    const pageVisited = pageNumber * perPage
    const pageCount = Math.ceil(data.length / perPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const display = data.slice(pageVisited, pageVisited + perPage).map((item, index) => {
        return (
            <div key={index}>
                {renderData(item, index)}
            </div>
        )
    })

    return (
        <>
            {display}
            <ReactPaginate
                previousLabel={pageNumber >= 1 ? 'Previous' : ''}
                nextLabel={pageNumber < pageCount - 1 ? 'Next' : ''}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginationBtn"
                previousLinkClassName='previousBtn'
                nextLinkClassName='nextBtn'
                activeClassName='paginationActive'
            />
        </>
    )

}

export default Pagination