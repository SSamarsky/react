import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

export const Pagination = ({ onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
        />
    )
}
