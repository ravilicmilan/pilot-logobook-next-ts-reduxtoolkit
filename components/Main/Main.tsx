'use client';
import { useReducer, useState, useEffect, useContext } from 'react';
import classes from './Main.module.css';
import ButtonsWrapper from '../ButtonsWrapper/ButtonsWrapper';
import Search from '../Search/Search';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
import Table from '../UI/Table/Table';
import Spinner from '../UI/Spinner/Spinner';
import Pagination from '../UI/Pagination/Pagination';
import Print from '../Print/Print';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { saveLogbook as saveLogbookToRedux } from '@/lib/features/logbook/logbookSlice';
import { getAllLogs, createNewRow, updateLog } from '@/lib/logbook';
import {
  getLogbookFromStorage,
  saveLogbookToStorage,
  getDefaultLogbookData,
  formatDate,
  getTableColumnsAsChecks,
  stripSecondsFromTime,
  addMorePrintInfo,
} from '@/utils/helpers';
import {
  getMaxPageNum,
  getPageData,
  sanitizeData,
} from '@/utils/logbookHelpers';
import { logout } from '@/lib/user';
import { printContent } from '@/utils/print';
import { LogbookType } from '@/types/database';
import { LogbookFormState } from '@/types/components';

export default function Main() {
  const dataFromStorage = getLogbookFromStorage();
  const logbook = useAppSelector((state) => state.logbook);
  const searchParams = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const [currentLogbook, setCurrentLogbook] = useState<LogbookFormState>(() => {
    const defaultData = getDefaultLogbookData();
    return defaultData as LogbookFormState; // Cast as LogbookFormState
  });
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [dataForPage, setDataForPage] = useState<LogbookType[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchData, setSearchData] = useState<LogbookType[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrint, setShowPrint] = useState(false);
  const [fields, setFields] = useState(getTableColumnsAsChecks() || {});

  useEffect(() => {
    setIsMounted(true); // debilana
  }, []);

  useEffect(() => {
    if (!dataFromStorage) {
      // console.log('FETCH DATA FROM SERVER!!!');
      refreshData();
    } else {
      setLogbookData(dataFromStorage);
    }
  }, []);

  const setLogbookData = (data: LogbookType[]) => {
    // dispatch({ type: 'SET_LOGBOOK_DATA', data });
    const maxPage = getMaxPageNum(data);
    setPageNum(maxPage);
    setMaxPage(maxPage);
    const dataForCurrentPage = getPageData(maxPage, data);
    setDataForPage(dataForCurrentPage);
    dispatch(saveLogbookToRedux(data));
    setIsLoading(false);
  };

  const saveLogbook = (data: LogbookType) => {
    closeForm();
    // console.log('CALL API AND SAVE RECORD TO DB!', data);
    if (isEditMode) {
      // console.log('UPDATE RECORD');
      updateExistingRecord(data);
    } else {
      // console.log('INSERT RECORD');
      insertNewRecord(data);
    }
  };

  const insertNewRecord = async (data: LogbookType) => {
    setIsLoading(true);
    const preparedData = sanitizeData(data);
    // console.log(preparedData);
    try {
      const res = await createNewRow(preparedData);
      if (res && typeof res === 'object') {
        const newLogbook = res && [...logbook, ...res];
        newLogbook && setLogbookData(newLogbook);
        // console.log('INSERT SUCCESS!', res);
      }
    } catch (err) {
      console.log('INSERT ERROR !!!', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateExistingRecord = async (data: LogbookType) => {
    setIsLoading(true);
    const preparedData = sanitizeData(data);
    const { id } = preparedData;
    // delete preparedData.id;

    try {
      const res = await updateLog(id, preparedData);
      if (res && typeof res === 'object') {
        const newLogbook = [...logbook].map((log) =>
          log.id === id ? res[0] : log
        );
        setLogbookData(newLogbook);
      }
    } catch (err) {
      console.log('UPDATE ERROR!!', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (isEdit = false) => {
    if (!isEdit) {
      const newData = getDefaultLogbookData();
      newData.date = formatDate(new Date());
      newData.page_num = pageNum;
      setCurrentLogbook(newData);
    }

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditMode(false);
  };

  const toggleSearch = () => {
    if (showSearch) {
      setIsSearchMode(false);
    }
    setShowSearch(!showSearch);
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllLogs();
      if (data && typeof data === 'object') {
        const preparedData = stripSecondsFromTime(data);

        setLogbookData(preparedData);
        saveLogbookToStorage(preparedData);
      }
    } catch (err) {
      console.log('CANNOT GET RECORDS>>>', err);
    } finally {
      setIsLoading(false);
    }
  };

  const executeSearch = (data: LogbookType[]) => {
    setIsSearchMode(true);
    setSearchData(data);
  };

  function toLogbookFormState(data: LogbookType): LogbookFormState {
    const formState = {} as LogbookFormState;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof LogbookType];

        // Check if the key is one of the numeric keys
        if (typeof value === 'number') {
          (formState as any)[key] = value;
        } else if (value === null) {
          // Convert null values to an empty string
          (formState as any)[key] = '';
        } else {
          // Convert all other values to a string
          (formState as any)[key] = String(value);
        }
      }
    }
    return formState;
  }

  const onEditRecord = (data: LogbookType) => {
    // console.log('EDIT DATA', data);
    setIsEditMode(true);

    // Use the type-safe conversion function
    const formState = toLogbookFormState(data);
    setCurrentLogbook(formState);
    openForm(true);
  };

  const logoutUser = async () => {
    logout();
  };

  const printDialog = () => {
    setShowPrint(true);
  };

  const closePrintDialog = () => {
    setShowPrint(false);
  };

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldFields = [...fields];
    oldFields.forEach((field) => {
      if (field.key === e.target.name) {
        field.checked = !field.checked;
      }
    });
    setFields(oldFields);
  };

  const executePrint = () => {
    closePrintDialog();
    printContent(fields, addMorePrintInfo(searchParams, pageNum));
  };

  const goToFirstPage = () => {
    setPageNum(1);
    const pageData = getPageData(1, logbook);
    setDataForPage(pageData);
  };

  const goToPreviousPage = () => {
    const page = pageNum - 1;
    setPageNum(page);
    const pageData = getPageData(page, logbook);
    setDataForPage(pageData);
  };

  const goToNextPage = () => {
    const page = pageNum + 1;
    setPageNum(page);
    const pageData = getPageData(page, logbook);
    setDataForPage(pageData);
  };

  const goToLastPage = () => {
    setPageNum(maxPage);
    const pageData = getPageData(maxPage, logbook);
    setDataForPage(pageData);
  };

  const renderMainContent = () => {
    if (isMounted) {
      return (
        <>
          <ButtonsWrapper
            openForm={openForm}
            refreshData={refreshData}
            toggleSearch={toggleSearch}
            searchButtonText={showSearch ? 'HIDE SEARCH' : 'SHOW SEARCH'}
            logoutUser={logoutUser}
            printDialog={printDialog}
          />
          {showForm && (
            <Modal>
              <Form
                closeForm={closeForm}
                currentLogbook={currentLogbook}
                saveLogbook={saveLogbook}
              />
            </Modal>
          )}
          {showSearch && (
            <Search logbook={logbook} executeSearch={executeSearch} />
          )}
          <Table
            dataForPage={isSearchMode ? searchData : dataForPage}
            logbook={logbook}
            onEditRecord={onEditRecord}
            pageNum={pageNum}
            isSearchMode={isSearchMode}
          />
          {!isSearchMode && (
            <Pagination
              pageNum={pageNum}
              maxPage={maxPage}
              goToFirstPage={goToFirstPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
              goToLastPage={goToLastPage}
            />
          )}
          {showPrint && (
            <Modal>
              <Print
                executePrint={executePrint}
                closePrintDialog={closePrintDialog}
                updateFields={updateFields}
                fields={fields}
              />
            </Modal>
          )}
        </>
      );
    } else {
      return null;
    }
  };

  const styles = ['flex-column', 'flex-center', classes.Main].join(' ');

  // console.log('MAIN RENDER::::', logbook);
  return (
    <div className={styles}>
      {!isLoading ? renderMainContent() : <Spinner />}
    </div>
  );
}
