import { LogbookType, NumericKeys } from './database';

export type ButtonType = {
  disabled?: boolean;
  type?: string;
  buttonSmall?: boolean;
  onClick: (e: React.MouseEvent) => void;
  styles?: React.CSSProperties;
  buttonText: string;
};

export type CheckboxType = {
  labelText: string;
  name?: string;
  checked: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputType = {
  labelStyles?: React.CSSProperties;
  labelText?: string;
  styles?: React.CSSProperties;
  name?: string;
  onBlur?: () => void;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SelectType = {
  labelText?: string;
  value?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  styles?: React.CSSProperties;
  hasDefaultDisabled?: boolean;
  options?: string[];
};

export type PaginationType = {
  pageNum: number;
  maxPage: number;
  goToFirstPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToLastPage: () => void;
};

export type TableType = {
  logbook: LogbookType[];
  dataForPage: LogbookType[];
  onEditRecord: (data: LogbookType) => void;
  pageNum: number;
  isSearchMode: boolean;
};

export type LoginType = {
  checkAuth: () => void;
};

export type ModalType = {
  children: React.ReactNode;
};

export type SearchParamsType = {
  removeParam: (idx: number) => void;
  onLabelChange: (idx: number, value: string) => void;
  searchParam: SearchType;
  onOperatorChange: (idx: number, value: string) => void;
  onValueChange: (idx: number, value: string) => void;
  idx: number;
};

export type PrintFieldsType = {
  key: string;
  text: string;
  checked: boolean;
};

export type PrintType = {
  fields: PrintFieldsType[];
  updateFields: (e: React.ChangeEvent<HTMLInputElement>) => void;
  executePrint: () => void;
  closePrintDialog: () => void;
};

export type SearchType = {
  label: string;
  operator: string;
  value: string;
};

export type ActionParams = {
  idx: number;
  key: keyof SearchType;
  value: string;
};

export type FormType = {
  currentLogbook: LogbookType;
  closeForm: () => void;
  saveLogbook: (logbookData: LogbookType) => void;
};

export type ButtonsWrapperType = {
  openForm: () => void;
  refreshData: () => void;
  searchButtonText: string;
  toggleSearch: () => void;
  printDialog: () => void;
  logoutUser: () => void;
};

export type SearchPropsType = {
  logbook: LogbookType[];
  executeSearch: (result: LogbookType[]) => void;
};

export type LogbookFormState = {
  // Iterate over every key in LogbookType
  [K in keyof LogbookType]: K extends NumericKeys // Check if the key is one of the numeric keys
    ? // If it is, keep the original type (e.g., number)
      LogbookType[K]
    : // If not, convert it to a string (for form handling)
      string;
};
