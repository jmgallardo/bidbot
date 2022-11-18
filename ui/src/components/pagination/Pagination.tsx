import { FunctionComponent,useEffect} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { scrollToTop } from "./scroll";

interface Props {
  itemsCount: number,
  itemsPerPage: number,
  currentPage: number,
  setCurrentPage: (number:number) => void;
  alwaysShown: boolean
}

const PaginationComponent: FunctionComponent<Props> = ({itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  alwaysShown = true})  => { 

const pagesCount = Math.ceil(itemsCount / itemsPerPage);
const isPaginationShown = alwaysShown ? true : pagesCount > 1;
const isCurrentPageFirst = currentPage === 1;
const isCurrentPageLast = currentPage === pagesCount;


  const changePage = (number:number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
    scrollToTop();
  };

  const onPageNumberClick = (pageNumber:number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange:boolean;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
    Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <Pagination className='mb-0'>
          <Pagination.Prev
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
          />
        </Pagination>
      )}
    </>
  );




};





export default PaginationComponent;
