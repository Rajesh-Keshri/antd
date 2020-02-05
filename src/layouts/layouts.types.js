import { func, any, bool, shape, string, arrayOf } from 'prop-types';
import { routeType, setting } from '@/types/common.proptypes'

export const location = shape({
  hash: string.isRequired,
  key: string,
  pathname: string.isRequired,
  query: any,
  search: string.isRequired,
  state: any
})

export const basicLayoutType = {
  dispatch:func.isRequired,
  route: any.isRequired,
  collapsed: bool.isRequired,
  isMobile: bool.isRequired,
  location,
  menuData: arrayOf(routeType),
  breadcrumbNameMap: any.isRequired,
  fixSiderbar: bool.isRequired,
  layout: string.isRequired,
  navTheme: string.isRequired,
  children: any.isRequired,
  fixedHeader: bool.isRequired
}


export const HeaderLayoutType = {
  handleMenuCollapse: func,
  autoHideHeader: bool,
  setting,
  dispatch:func,
  isMobile:bool,
  collapsed: bool
}
  
  
 