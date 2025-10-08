'use client';
import { LogbookTotals, LogbookType, TotalsType } from '@/types/database';
import { calculateTotals } from './helpers';
import { SearchType } from '@/types/components';

export function getPageData(
  pageNum: number,
  data: LogbookType[]
): LogbookType[] {
  let dataForPage: LogbookType[] = [];

  data.forEach((o) => {
    if (o.page_num === pageNum) {
      dataForPage.push(o);
    }
  });

  return dataForPage;
}

export function getMaxPageNum(data: LogbookType[]): number {
  let pageNum = 0;

  data.forEach((o) => {
    if (o.page_num !== null && o.page_num > pageNum) {
      pageNum = o.page_num;
    }
  });

  return pageNum;
}

export function findRecordById(
  id: number,
  dataForPage: LogbookType[]
): LogbookType | undefined {
  return dataForPage.find((o) => o.id === id);
}

// export function prepareSearchParams(data: SearchType[]) {
//   const obj = {};

//   data.forEach((param) => {
//     const { label, operator, value } = param;
//     if (value && value !== null && value !== '') {
//       if (operator === '=') {
//         obj[label] = value; // WHERE column LIKE %somestring%
//       } else if (operator === '<>') {
//         const searchValArr = value.split(/[,;]/).map((item) => item.trim());
//         obj[label] = { operator: 'between', value: searchValArr };
//       } else {
//         obj[label] = { operator, value: value };
//       }
//     }
//   });

//   return obj;
// }

export function findRecordsByQuery(
  data: LogbookType[],
  query: SearchType[]
): LogbookType[] | null {
  if (!query || query.length === 0) {
    return data; // Return all data if no query is specified
  }
  console.log('STA IMA DATA????', data, query);
  const filteredData = data.filter((item) => {
    // Check if every search parameter is satisfied for the current item
    return query.every((searchParam) => {
      // Safely cast the label to a key of LogbookType
      console.log('SEARCH PARAM??????', searchParam);
      const key = searchParam.label as keyof LogbookType;
      const itemValue = item[key];

      // Handle the case where the property is null or undefined
      if (itemValue === null || itemValue === undefined) {
        return false; // Does not match
      }

      if (searchParam.operator) {
        switch (searchParam.operator) {
          case '=':
            if (typeof itemValue === 'string') {
              return itemValue
                .toLowerCase()
                .includes(searchParam.value.toLowerCase());
            } else if (
              typeof itemValue === 'number' &&
              typeof searchParam.value === 'number'
            ) {
              return itemValue === searchParam.value;
            }
          case '>':
            return itemValue > searchParam.value;
          case '>=':
            return itemValue >= searchParam.value;
          case '<':
            return itemValue < searchParam.value;
          case '<=':
            return itemValue <= searchParam.value;
          case '!=':
            return itemValue !== searchParam.value;
          case '<>':
            const searchValArr = searchParam.value
              .split(/[,;]/)
              .map((item) => item.trim());
            console.log('SeARCH ARRRAY???', searchValArr);
            const [min, max] = searchValArr;
            return itemValue >= min && itemValue <= max;
        }
      }

      // Handle exact matches for all other types, or if no operator was specified
      return itemValue === searchParam.value;
    });
  });
  console.log('FILTERED DATA??', filteredData);
  return filteredData.length > 0 ? filteredData : null;
}

export function getTotalsForPage(
  dataForPage: LogbookType[],
  logbookData: LogbookType[],
  pageNum: number
): LogbookTotals {
  const dataForSubtotal: TotalsType = calculateTotals(dataForPage);
  const filteredData = logbookData.filter(
    (o) => o.page_num !== null && o.page_num <= pageNum
  );
  const dataForTotal: TotalsType = calculateTotals(filteredData);

  return { dataForSubtotal, dataForTotal };
}

export function getTotalsForData(data: LogbookType[]): TotalsType {
  const totals = calculateTotals(data);
  return totals;
}

export function sanitizeData(obj: LogbookType): LogbookType {
  // Convert the object to an array of key-value pairs
  const entries = Object.entries(obj);

  // Map over the entries to transform them
  const newEntries = entries.map(([key, value]) => {
    // Type assertion is safe here as the key is from the original object
    const typedKey = key as keyof LogbookType;

    // Logic to sanitize the data
    if (value === '') {
      // If the value is an empty string, set it to null
      return [typedKey, null];
    } else if (
      typedKey === 'page_num' ||
      typedKey === 'landings_day' ||
      typedKey === 'landings_night' ||
      typedKey === 'id'
    ) {
      // If it's one of the number keys and not an empty string, parse the value
      // We assume here that the value is a string that can be parsed
      return [typedKey, parseInt(String(value), 10)];
    } else {
      // Otherwise, return the original key/value pair
      return [typedKey, value];
    }
  });

  // Convert the new entries array back into an object and assert the type
  return Object.fromEntries(newEntries) as LogbookType;
}
