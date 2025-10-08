'use client';
import { useEffect, useState } from 'react';
import classes from './Table.module.css';
import Button from '../Button/Button';
import { tableColumnKeys } from '@/lib/config';
import { getTotalsForPage } from '@/utils/logbookHelpers';
import { TableType } from '@/types/components';
import { Tables, TotalsType } from '@/types/database';

export default function Table(props: TableType) {
  const { logbook, dataForPage, onEditRecord, pageNum, isSearchMode } = props;
  const [subTotal, setSubTotal] = useState<TotalsType>({});
  const [total, setTotal] = useState<TotalsType>({});

  useEffect(() => {
    const { dataForSubtotal, dataForTotal } = getTotalsForPage(
      dataForPage,
      logbook,
      pageNum
    );
    setSubTotal(dataForSubtotal);
    setTotal(dataForTotal);
  }, [logbook, dataForPage, pageNum]);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const currentRow = e.currentTarget;
    currentRow.classList.toggle(classes.Selected);
  };

  const renderRow = (data: Tables<'logbook'>, idx: number) => {
    return (
      <tr key={idx} className={classes.TableRow} onClick={handleRowClick}>
        <td className={[classes.EditBtn, 'td_action'].join(' ')}>
          <Button
            buttonText='EDIT'
            type='Success'
            buttonSmall
            styles={{ width: '40px' }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onEditRecord(data);
            }}
          />
        </td>
        {tableColumnKeys.map((col, i) => {
          const [key] = Object.entries(col)[0] as Array<
            keyof Tables<'logbook'>
          >;
          return (
            <td
              className={[classes[`td_${key}`], `td_${key}`].join(' ')}
              key={i}
            >
              {data[key]}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderSubtotal = () => {
    return renderRowFooter('Subtotal', subTotal);
  };

  const renderTotal = () => {
    return renderRowFooter('Total', total);
  };

  const renderRowFooter = (name: string, data: TotalsType) => {
    const classNames = name === 'Total' ? classes.Total : classes.SubTotal;
    const additionalClasses = name === 'Total' ? 'total_' : 'subtotal_';
    const id = name === 'Total' ? 'row-total' : 'row-subtotal';

    return (
      <tr id={id}>
        <td className={classNames}>{name}</td>
        {tableColumnKeys.map((col, i) => {
          const [key] = Object.entries(col)[0];
          return (
            <td
              className={[classNames, `${additionalClasses}${key}`].join(' ')}
              key={i}
            >
              {data.hasOwnProperty(key) ? data[key as keyof TotalsType] : ''}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div
      className={['flex-start', 'flex-column', classes.TableWrapper].join(' ')}
    >
      <table className={classes.Table} id='logbook-table'>
        <thead>
          <tr>
            <th className='th_action'>Action</th>
            {tableColumnKeys.map((col, idx) => {
              const [key, value] = Object.entries(col)[0];
              return (
                <th key={idx} className={`th_${key}`}>
                  {value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{dataForPage.length > 0 && dataForPage.map(renderRow)}</tbody>
        <tfoot>
          {renderSubtotal()}
          {!isSearchMode && renderTotal()}
        </tfoot>
      </table>
    </div>
  );
}
