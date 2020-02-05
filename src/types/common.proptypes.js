import { bool, string, shape, any, func } from 'prop-types';


export const routeType = shape({
  authority: any,
  component: any,
  exact: bool,
  icon: string.isRequired,
  locale: string.isRequired,
  name: string.isRequired,
  path: string.isRequired,
  title: string.isRequired,
});

export const formType = shape({
  getFieldDecorator: any,
  getFieldsValue: any,
});


export const setting = shape({
  autoHideHeader: bool,
  contentWidth: string,
  fixSiderbar: bool,
  fixedHeader: bool,
  layout: string,
  navTheme: string,
  primaryColor: string,
  primaryTheme: string,
});

export const locationType = shape({
  search: string,
  query: any,
  state: any,
  hash: string,
});

export const SearchBoxType = {
  buttonTex:string,
  placeHolderText:string,
  handleSearch:func
}
