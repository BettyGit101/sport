import {memo} from 'react';
import styles from './Pagination.module.css';

const Pagination = ({totalItems,itemsPerPage, currentPage, setCurrentPage}: { totalItems: number,itemsPerPage: number,currentPage: number,setCurrentPage: (arg: number) => void}) => {
    let pages: string[] = ["<"];

    for (let i=1; i<= Math.ceil(totalItems/itemsPerPage); i++) {
        pages.push(i.toString());
    }

    pages.push(">");

    const paginationClickHandler = (page:string) => {
        if (page === '<' && currentPage === 1) {
            setCurrentPage(1);
        } 
        else if (page === '>' && currentPage === pages.length-2) {
            setCurrentPage(pages.length-2);
        }
        else if (page === '<' && currentPage >= 2) {
            setCurrentPage(currentPage-1);
        }
        else if (page === '>' && currentPage <= pages.length-2) {
            setCurrentPage(currentPage+1);
        }
        else {
            setCurrentPage(+page);
        }
    }
    return (
        <div className={styles.pagination}>
            {pages.map((page:string) => {
                const selectedPage = page === currentPage.toString()? 'pagination__btn--selected':'';
                const isDisabled = (page === '<' && currentPage === 1) || (page === '>' && currentPage === pages.length-2);
                const isDisabledStyle = isDisabled ? 'pagination__btn--disabled':''
                return <button 
                            key={page}
                            onClick={() => paginationClickHandler(page)}
                            className={`${styles.pagination__btn} ${styles[selectedPage]}  ${styles[isDisabledStyle]}`}
                            >
                        {page}
                       </button>
            })}
        </div>
    )
}

export default memo(Pagination);