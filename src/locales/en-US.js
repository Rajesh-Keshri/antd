import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import settings from './en-US/settings';
import common from './en-US/common';
import formValidations from './en-US/formValidations';
import modal from './en-US/modal';
import sample from './en-US/sample';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  ...sample,
  ...common,
  ...globalHeader,
  ...menu,
  ...formValidations,
  ...modal,
  ...settings,
};
