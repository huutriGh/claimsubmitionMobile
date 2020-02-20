import claimAPI from '../api/claimsubmition';
import createDataContext from './createDataContext';
import {
  LOAD_NOTE,
  LOAD_HISTORY,
  LOAD_COMPONENT_FILE,
  ADD_ERROR,
} from '../constant/ActionType';

const policyReducer = (state, action) => {
  switch (action.type) {
    case LOAD_NOTE:
      return {...state, note: action.payload.note};
    case LOAD_COMPONENT_FILE:
      return {
        ...state,
        componentFile: action.payload.componentFile,
      };
    case LOAD_HISTORY:
      return {
        ...state,
        claimHistory: action.payload.claimHistory,
      };
    default:
      return state;
  }
};
const getNote = dispatch => async () => {
  try {
    const response = await claimAPI.get('/note');
    if (response) {
      dispatch({
        type: LOAD_NOTE,
        payload: {
          note: response.status === 401 ? [] : response.data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong!',
    });
  }
};
const getcomponentFile = dispatch => async () => {
  try {
    const response = await claimAPI.get('/componentfile');
    if (response) {
      dispatch({
        type: LOAD_COMPONENT_FILE,
        payload: {
          componentFile: response.status === 401 ? [] : response.data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong!',
    });
  }
};
// const history = [
//   {
//     tranno: 39,
//     policyNumber: '80004153',
//     componentName: 'Hỗ trợ chi phí nằm viện',
//     claimHistory: 'BT',
//     clmSubmitDate: '09-11-2017',
//     clmOccurDate: '13-10-2017',
//   },
//   {
//     tranno: 40,
//     policyNumber: '80004153',
//     componentName: 'Hỗ trợ chi phí nằm viện',
//     claimHistory: 'BT',
//     clmSubmitDate: '31-12-2017',
//     clmOccurDate: '06-12-2017',
//   },
//   {
//     tranno: 58,
//     policyNumber: '80004153',
//     componentName: 'Hỗ trợ chi phí nằm viện',
//     claimHistory: 'MT',
//     clmSubmitDate: '25-06-2018',
//     clmOccurDate: '30-04-2018',
//   },
//   {
//     tranno: 59,
//     policyNumber: '80004153',
//     componentName: 'Hỗ trợ chi phí nằm viện',
//     claimHistory: 'MT',
//     clmSubmitDate: '25-06-2018',
//     clmOccurDate: '30-05-2018',
//   },
//   {
//     tranno: 65,
//     policyNumber: '80004153',
//     componentName: 'Hỗ trợ chi phí nằm viện',
//     claimHistory: 'BT',
//     clmSubmitDate: '22-06-2018',
//     clmOccurDate: '30-04-2018',
//   },
// ];
const getClaimHistory = dispatch => async poNumber => {
  try {
    const response = await claimAPI.get(`/policyhistory/${poNumber}`);
    dispatch({
      type: LOAD_HISTORY,
      payload: {
        claimHistory: response.status === 401 ? [] : response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Something went wrong!',
    });
  }
};

export const {Provider, Context} = createDataContext(
  policyReducer,
  {getNote, getcomponentFile, getClaimHistory},
  {
    note: [],
    componentFile: [],
    claimHistory: [],
  },
);
