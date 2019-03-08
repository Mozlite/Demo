import { getGroup, fetchGroups, saveGroup, removeGroups } from '@/services/project';

export default {
  namespace: 'group',

  state: {
    list: [],
    current: {},
    msg: null
  },

  effects: {
    *get({ id }, { call, put }) {
      const response = yield call(getGroup, id);
      if (response.status)
        yield put({
          type: 'saveCurrent',
          payload: response.data
        });
      yield put({
        type: 'changeStatus',
        payload: response
      });
    },
    *fetch(_, { call, put }) {
      const response = yield call(fetchGroups);
      if (response.status)
        yield put({
          type: 'saveList',
          payload: response.data
        });
      yield put({
        type: 'changeStatus',
        payload: response
      });
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(saveGroup, payload);
      yield put({
        type: 'changeStatus',
        payload: response
      });
    },
    *remove({ ids }, { call, put }) {
      const response = yield call(removeGroups, ids);
      yield put({
        type: 'changeStatus',
        payload: response
      });
    }
  },
  /**
   * 将action绑定到state
   */
  reducers: {
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload
      };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      }
    },
    changeStatus(state, { payload }) {
      return {
        ...state,
        done: payload.status,
        msg: payload.msg,
      };
    },
  }
}
