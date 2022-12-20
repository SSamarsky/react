import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

export const Pagination = ({onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}
