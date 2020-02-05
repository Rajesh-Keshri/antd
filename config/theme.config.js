import {
    primaryColor,
    primaryTheme,
    menuColorDeactive,
    menuColorActive,
    listItemSelected,
    radioCheckedBg,
    radioCheckedColor,
    radioCheckedBorder,
    headingColor,
    switchTitleColor,
    subMenuBg,
    warningColor,
    whiteColor,
    fontSize64,
    fontSize33,
    fontSize24,
    fontSize20,
    fontSize16,
    fontSize15,
    fontSize14,
    fontSize12
} from '../src/defaultSettings';

module.exports = {
    'primary-color': primaryColor,
    'primary-text-color': primaryTheme,
    'list-item-selected': listItemSelected,
    'layout-header-background': primaryTheme,
    'layout-sider-background': primaryTheme,
    'layout-trigger-background': primaryTheme,
    'menu-dark-item-active-bg': primaryTheme,
    'menu-dark-bg': primaryTheme,
    'menu-dark-color': menuColorDeactive,
    'menu-item-color': menuColorActive,
    'menu-dark-submenu-bg': subMenuBg,
    'submenu-item-selected': radioCheckedColor,
    'heading-color': headingColor,
    'white-color': whiteColor,
    
    // Switch btn
    'switch-title-color': switchTitleColor,

    // Radio btn
    'radio-button-checked-bg': radioCheckedBg,
    'radio-button-active-color': radioCheckedColor,
    'radio-button-border': radioCheckedBorder,
    'warning-text-color': warningColor,

    // Global font sizes
    'font-size-64': fontSize64,
    'font-size-33': fontSize33,
    'font-size-24': fontSize24,
    'font-size-20': fontSize20,
    'font-size-16': fontSize16,
    'font-size-15': fontSize15,
    'font-size-14': fontSize14,
    'font-size-12': fontSize12,
};
