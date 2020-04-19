import { GLOBAL_MODEL } from '@/actions/action.types';
import { getRequest } from '@/services/commonReq';
import { selectSampleData } from '@/selectors/sample.selectors'

import {API_FETCH_FLIGHTS} from '@/utils/constants';

export default {
  namespace: GLOBAL_MODEL,

  state: {
    entityResponse: [],
  },

  effects: {
    *fetch({payload}, {call, put, select}) {
      const response = yield call(getRequest, API_FETCH_FLIGHTS, payload);
      yield put({ type: 'updateFetchResult', payload: response.list });
      return yield select(selectSampleData);
    },
  },

  reducers: {
    updateFetchResult(state, action) {
      return {
        ...state,
        entityResponse: action.payload,
      };
    }
  }
};
