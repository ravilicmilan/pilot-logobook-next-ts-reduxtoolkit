'use client';
import classes from './Pagination.module.css';
import Button from '../Button/Button';
import { PaginationType } from '@/types/components';

export default function Pagination(props: PaginationType) {
  const {
    pageNum,
    maxPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = props;
  return (
    <div
      id='pagination-wrapper'
      className={['flex-center', 'flex-row', classes.PaginationWrapper].join(
        ' '
      )}
    >
      <Button
        buttonText='|<'
        type='Primary'
        buttonSmall
        disabled={pageNum === 1}
        onClick={goToFirstPage}
      />
      <Button
        buttonText='<'
        type='Primary'
        buttonSmall
        disabled={pageNum === 1}
        onClick={goToPreviousPage}
      />
      <div className={classes.PageNumber}>
        {pageNum} / {maxPage}
      </div>
      <Button
        buttonText='>'
        type='Primary'
        buttonSmall
        disabled={pageNum === maxPage}
        onClick={goToNextPage}
      />
      <Button
        buttonText='>|'
        type='Primary'
        buttonSmall
        disabled={pageNum === maxPage}
        onClick={goToLastPage}
      />
    </div>
  );
}
