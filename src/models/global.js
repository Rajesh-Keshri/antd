export default {
  namespace: 'global',

  state: {
    entityResponse: [],
    collapsed: false,
    modalVisible: false,
    notices: [],
    actionMode:'',
  },

  effects: {
    *toggleModal(_, {put, select}) {
      const modalVisible = yield select( state => state.global.modalVisible)
      yield put({ type: 'changeModalState', payload: !modalVisible });
    },
  },

  reducers: {
    changeModalState(state, {payload}) {
      return {
        ...state,
        modalVisible: payload
      }
    },
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    }
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
