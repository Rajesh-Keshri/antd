import { func, any, bool, string, arrayOf, shape, number } from 'prop-types';
import { routeType } from './common.proptypes';

export const commonMenuDataType = {
  isMobile: bool.isRequired,
  menuData: arrayOf(routeType).isRequired,
  collapsed: bool.isRequired,
  onCollapse: func.isRequired,
};

export const baseMenuType = {
  ...commonMenuDataType,
  flatMenuKeys: arrayOf(string).isRequired,
  location: any,
  openKeys: arrayOf(string),
  theme: string.isRequired,
  mode: string.isRequired,
  className: string,
  handleOpenChange: func.isRequired,
  style: any.isRequired,
};

export const sideMenuType = {
  logo: string.isRequired,
  collapsed: bool.isRequired,
  onCollapse: func.isRequired,
  fixSiderbar: bool.isRequired,
  theme: string.isRequired,
};

export const pageHeaderWrapperType = {
  form: any,
  loading: bool,
  breadCrumbBtn: bool.isRequired,
  dispatch: func,
  closeModal: func,
  createModal: func,
  handleSubmit: func,
  children: any,
  modalForm: any,
  contentWidth: string,
  wrapperClassName: string,
  top: any,
  title: string,
  showProcessSteps: bool,
  processCurrentStep: number
};


export const gridContentType = {
  children: any,
  contentWidth: string,
};

export const headerAddButtonType = {
  title: string.isRequired,
  onClick: func.isRequired,
};

export const LoaderDataHandlerType = {
  loading: bool.isRequired,
};

export const CustomCheckboxType = {
  details: shape({
    defaultChecked: bool.isRequired,
    labelCheckbox: string.isRequired,
    info: any,
  }).isRequired,
  value: any,
};

export const CustomSelectBoxType = {
  options: arrayOf(any).isRequired, 
  onChange: func.isRequired, 
  value: string,
  searchKeys: arrayOf(string),
  placeholder: string
};

export const SamplePageType = {
  
};
