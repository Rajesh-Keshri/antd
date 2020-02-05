import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Menu } from 'antd';
import Icon from '@material-ui/core/Icon';
import Link from 'umi/link';
import { baseMenuType } from '@/types/component.proptypes';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '@/utils/utils';
import styles from './index.less';

const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    // return <Icon type={icon} />
    return <Icon className={`anticon ${styles.anticon}`} theme="outlined">{icon} </Icon>;
  }
  return icon;
};

class BaseMenu extends PureComponent {
    /**
     * @memberof SiderMenu
     */
    getNavMenuItems = (menusData, parent) => {
      if (!menusData) {
        return [];
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => this.getSubMenuOrItem(item, parent))
        .filter(item => item);
    };

    // Get the currently selected menu
    getSelectedMenuKeys = pathname => {
      const { flatMenuKeys } = this.props;
      return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    };

    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = item => {
      // doc: add hideChildrenInMenu
      if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        const { name } = item;
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span
                    data-test={`sideMenu${name}-text`}
                    style={{ 'marginLeft': '10px' }}
                  >{name}
                  </span>
                </span>
              ) : (
                name
              )
            }
            key={item.path}
          >
            {this.getNavMenuItems(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    };

    /**
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = item => {
      const { name } = item;
      const itemPath = this.conversionPath(item.path);
      const icon = getIcon(item.icon);
      const { target } = item;
      const dataTest = name.replace(/\s/g, '');
      // Is it a http link
      if (/^https?:\/\//.test(itemPath)) {
        return (
          <a
            data-test={`side-menu-${dataTest}`}
            id={`side_menu_${name}`}
            href={itemPath}
            target={target}
          >
            {icon}
            <span>{name}</span>
          </a>
        );
      }
      const { location, isMobile, onCollapse } = this.props;
      return (
        <Link
          data-test={`sideMenu${dataTest}`}
          id={`side_menu_${name}`}
          to={itemPath}
          target={target}
          replace={itemPath === location.pathname}
          onClick={
            isMobile
              ? () => {
                onCollapse(true);
              }
              : undefined
          }
        >
          {icon}
          <span
            data-test={`sideMenu${dataTest}-text`}
            style={{ 'marginLeft': '10px' }}
          >{name}
          </span>
        </Link>
      );
    };

    conversionPath = path => {
      if (path && path.indexOf('http') === 0) {
        return path;
      }
      return `/${path || ''}`.replace(/\/+/g, '/');
    };

    render() {
      const {
        openKeys,
        theme,
        mode,
        location: { pathname },
        className,
        collapsed,
      } = this.props;
        // if pathname can't match, use the nearest parent's key
      let selectedKeys = this.getSelectedMenuKeys(pathname);
      if (!selectedKeys.length && openKeys) {
        selectedKeys = [openKeys[openKeys.length - 1]];
      }
      let props = {};
      if (openKeys && !collapsed) {
        props = {
          openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
        };
      }
      const { handleOpenChange, style, menuData } = this.props;
      const cls = classNames(className, {
        'top-nav-menu': mode === 'horizontal',
      });

      return (
        <Menu
          key="Menu"
          data-test="menu-component"
          mode={mode}
          theme={theme}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          className={cls}
          {...props}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      );
    }
}

BaseMenu.defaultProps = {
  className: '',
  style: '',
};

BaseMenu.propTypes = baseMenuType;

export default BaseMenu;
