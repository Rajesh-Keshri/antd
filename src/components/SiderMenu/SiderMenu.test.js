import { getFlatMenuKeys, getDefaultCollapsedSubMenus, getMenuMatches } from './SiderMenuUtils';


const menu = [
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/name',
      },
    ],
  },
  {
    path: '/userinfo',
    children: [
      {
        path: '/userinfo/:id',
        children: [
          {
            path: '/userinfo/:id/info',
          },
        ],
      },
    ],
  },
];

const defaultMenu = {
  location:{
    hash: '',
    key: 'p8bl10',
    pathname: '/samplePage',
    query:{},
    search:'',
    state:''
  },
  flatMenuKeys:['/samplePage']}

const flatMenuKeys = getFlatMenuKeys(menu);

const getDefaultCollapsedMenu = getDefaultCollapsedSubMenus(defaultMenu)

const getMatches = getMenuMatches(defaultMenu.flatMenuKeys, defaultMenu.location.pathname)

describe('test convert nested menu to flat menu', () => {

  test('simple menu', () => {
    expect(flatMenuKeys).toEqual([
      '/dashboard',
      '/dashboard/name',
      '/userinfo',
      '/userinfo/:id',
      '/userinfo/:id/info',
    ]);
  });

  test('Testing getting collapsed menu into array',()=>{

    expect(getMatches).toEqual(defaultMenu.flatMenuKeys);

    expect(getDefaultCollapsedMenu).toEqual(defaultMenu.flatMenuKeys);

  })

});

