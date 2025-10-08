'use client';

import { tableColumnKeys } from '@/lib/config';
import {
  LogbookFormState,
  PrintFieldsType,
  SearchType,
} from '@/types/components';
import { LogbookKeys, LogbookType, TotalsType } from '@/types/database';

function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export function calculateTotals(data: LogbookType[]): TotalsType {
  const totals: TotalsType = {
    single_engine_time: '00:00',
    multi_engine_time: '00:00',
    multi_pilot_time: '00:00',
    total_flight_time: '00:00',
    landings_day: 0,
    landings_night: 0,
    operational_night_time: '00:00',
    operational_ifr_time: '00:00',
    pic_time: '00:00',
    co_pilot_time: '00:00',
    dual_time: '00:00',
    instructor_time: '00:00',
    simulator_time: '00:00',
  };

  data.forEach((obj) => {
    typedKeys(totals).forEach((key) => {
      const objValue = obj[key as keyof LogbookType];

      if (objValue !== undefined && objValue !== null) {
        if (key === 'landings_day' || key === 'landings_night') {
          // Type guard to ensure objValue is a number before adding
          if (typeof objValue === 'number') {
            (totals[key] as number) += objValue;
          } else if (typeof objValue === 'string') {
            // Added handling for string case, specifying radix 10
            (totals[key] as number) += parseInt(objValue, 10);
          }
        } else {
          // Type guard to ensure objValue is a string before calling sumTime
          if (typeof objValue === 'string') {
            const currentTime = objValue;
            (totals[key] as string) = sumTime(
              totals[key] as string,
              currentTime
            );
          }
        }
      }
    });
  });

  return totals;
}

export function sumTime(time1: string, time2: string): string {
  // if (!time1 || !time2) return false;
  return calculateTime(time1, time2, '+');
}

export function timeDiff(time1: string, time2: string): string {
  // if (!time1 || !time2) return false;
  return calculateTime(time1, time2, '-');
}

export function calculateTime(
  time1: string,
  time2: string,
  operator: string
): string {
  const arr1 = time1.split(':');
  const arr2 = time2.split(':');
  const [h1, m1] = arr1;
  const [h2, m2] = arr2;
  let totalMinutes1 = parseInt(h1) * 60 + parseInt(m1);
  let totalMinutes2 = parseInt(h2) * 60 + parseInt(m2);
  let totalTimeInMinutes = 0;

  if (operator === '+') {
    totalTimeInMinutes = totalMinutes1 + totalMinutes2;
  } else if (operator === '-') {
    if (totalMinutes2 < totalMinutes1) {
      totalTimeInMinutes = totalMinutes2 + 24 * 60 - totalMinutes1;
    } else {
      totalTimeInMinutes = totalMinutes2 - totalMinutes1;
    }
  }

  const totalHours = Math.floor(totalTimeInMinutes / 60);
  const restOfMinutes = totalTimeInMinutes - totalHours * 60;
  return `${totalHours <= 9 ? '0' + totalHours : totalHours}:${restOfMinutes <= 9 ? '0' + restOfMinutes : restOfMinutes}`;
}

export function compareDates(date1: string, date2: string, operator: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const time1 = d1.getTime();
  const time2 = d2.getTime();

  if (operator === '<') {
    return time1 < time2;
  } else if (operator === '>') {
    return time1 > time2;
  } else if (operator === '<=') {
    return time1 <= time2;
  } else if (operator === '>=') {
    return time1 >= time2;
  }
}

export function isDateInRange(date: string, min: string, max: string) {
  return compareDates(date, min, '>=') && compareDates(date, max, '<=');
}

export function formatDate(date: Date) {
  let formattedDate = new Date(date);
  return formattedDate.toISOString().split('T')[0];
}

export function getLogbookFromStorage() {
  'use client';
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem('logbook');
    if (data) {
      return JSON.parse(data);
    } else {
      return false;
    }
  }
}

export function saveLogbookToStorage(data: LogbookType[]) {
  'use client';
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('logbook', JSON.stringify(data));
  }
}

export function getDefaultLogbookData(): LogbookFormState {
  const defaultLogbook: LogbookFormState = {} as LogbookFormState;

  LogbookKeys.forEach((key) => {
    // Check if the property should be a string in the form state
    const isStringProperty = typeof defaultLogbook[key] === 'string';

    // Initialize properties based on their type
    if (isStringProperty) {
      (defaultLogbook as any)[key] = ''; // Initialize string properties with empty string
    } else {
      (defaultLogbook as any)[key] = null; // Initialize other properties (like numbers) with null
    }
  });

  return defaultLogbook;
}

// export function getDefaultLogbookData(): Record<string, string> {
//   // Use Record<string, string> to define an object with string keys and string values
//   const obj: Record<string, string> = {};

//   tableColumnKeys.forEach((col) => {
//     // Correctly and safely get the key from the column object
//     const [key] = Object.entries(col)[0];
//     obj[key] = '';
//   });

//   return obj;
// }

export function getTableColumnsAsChecks(): PrintFieldsType[] {
  return tableColumnKeys.map((col) => {
    const [key, value] = Object.entries(col)[0];
    return { key, text: value, checked: true };
  });
}

export function removeSeconds(time: string): string {
  const arr = time.split(':');
  return `${arr[0]}:${arr[1]}`;
}

export function stripSecondsFromTime(data: LogbookType[]): LogbookType[] {
  console.log('STRIP SECONDS !!!!!!');
  const timeKeys: Array<keyof LogbookType> = [
    'departure_time',
    'destination_time',
    'single_engine_time',
    'multi_engine_time',
    'multi_pilot_time',
    'total_flight_time',
    'operational_night_time',
    'operational_ifr_time',
    'pic_time',
    'co_pilot_time',
    'dual_time',
    'instructor_time',
    'simulator_time',
  ];

  return data.map((obj) => {
    // 1. Get an array of key/value pairs
    const entries = Object.entries(obj);

    // 2. Map over the entries to transform them
    const newEntries = entries.map(([key, value]) => {
      // Type assertion is safe here as key is from the original object
      const typedKey = key as keyof LogbookType;

      // Check if the key is in our list of time properties
      if (
        timeKeys.includes(typedKey) &&
        typeof value === 'string' &&
        value !== null
      ) {
        // Return the modified key/value pair
        return [typedKey, removeSeconds(value)];
      }

      // Return the original key/value pair
      return [typedKey, value];
    });

    // 3. Convert the new entries array back into an object
    return Object.fromEntries(newEntries) as LogbookType;
  });
}

export function addMorePrintInfo(
  searchParams: SearchType[],
  page: number
): string {
  let str = '';

  if (!searchParams || searchParams.length === 0) {
    str += 'Page: ' + page;
  } else {
    searchParams.forEach((param, idx) => {
      // Find the corresponding column configuration object
      const colConfig = tableColumnKeys.find((col) =>
        col.hasOwnProperty(param.label)
      );

      // Use a type guard to ensure colConfig is not undefined
      if (colConfig) {
        // Use Object.values to safely get the label string
        // The first and only value in the object is the label
        const label = Object.values(colConfig)[0];

        const conjunction = convertOperatorAndValues(
          param.operator,
          param.value
        );

        str += `${label}${conjunction}`;

        if (idx < searchParams.length - 1) {
          str += ' | ';
        }
      }
    });
  }

  return `Query:::> ${str}`;
}

export function convertOperatorAndValues(
  operator: string,
  value: string
): string {
  let str = '';

  if (operator === '=') {
    str = `: ${value}`;
  } else if (operator === '<>') {
    const [val1, val2] = value.split(/[,;]/);
    str = `: between ${val1} and ${val2}`;
  } else if (operator === '!=') {
    str = ` is not ${value}`;
  } else {
    str = `${operator} ${value}`;
  }

  return str;
}
