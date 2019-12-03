import AsyncStorage from '@react-native-community/async-storage';
import claimAPI from '../api/claimsubmition';
import {
  ADD_ERROR,
  CLEAR_ERROR_MESSAGE,
  SHOW_LIFEID_LIST,
  SIGNIN,
  SIGNIN_CONTINUE,
  SIGNOUT,
  ISLOADING,
} from '../constant/ActionType';
import {navigate} from '../navigationRef';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        errorMessage: action.payload.error,
        isLoading: action.payload.isLoading,
      };
    case ISLOADING:
      return {...state, isLoading: true};
    case SHOW_LIFEID_LIST:
      return {...state, listLifeIdNum: action.payload};
    case SIGNIN:
      return {
        errorMessage: '',
        token: action.payload.token,
        listLifeIdNum: action.payload.listLifeIdNum,
        policyNumber: action.payload.policyNumber,
        idNumber: action.payload.idNumber,
      };
    case SIGNIN_CONTINUE:
      return {
        ...state,
        lifeIdNum: action.payload.lifeIdNum,
      };
    case CLEAR_ERROR_MESSAGE:
      return {...state, errorMessage: ''};
    case SIGNOUT:
      return {
        token: null,
        errorMessage: '',
        listLifeIdNum: [],
        lifeIdNum: '',
        policyNumber: '',
        idNumber: '',
        isLoading: false,
      };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: CLEAR_ERROR_MESSAGE});
};

const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};
const signin = dispatch => async ({policyNumber, idNumber}) => {
  try {
    dispatch({type: ISLOADING});
    const response = await claimAPI.post('/authenticate', {
      policyNumber,
      idNumber,
    });
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      const policyDetail = await claimAPI.get(
        `/policy/${policyNumber}/${idNumber}`,
      );
      if (policyDetail.data) {
        // let unique = [
        //   ...new Set(policyDetail.data.map(item => item.lifeIdNum.trim())),
        // ];

        const lifeIdObj = policyDetail.data.map(function(i) {
          return {
            lifeIdNum: i.lifeIdNum,
            lifeName: i.lifeName,
          };
        });
        let unique = getUnique(lifeIdObj, 'lifeIdNum');

        await AsyncStorage.setItem(
          'policyDetail',
          JSON.stringify(policyDetail.data),
        );
        dispatch({
          type: SIGNIN,
          payload: {
            token: response.data.token,
            listLifeIdNum: unique,
            policyNumber,
            idNumber,
          },
        });
        navigate('Signin');
      }
    }
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: {
        error: 'Đăng nhập thất bại. Vui lòng thử lại',
        isLoading: false,
      },
    });
  }
};

const continueSignin = dispatch => async (
  lifeIdNum,
  policyNumber,
  idNumber,
) => {
  if (lifeIdNum === '') {
    dispatch({
      type: ADD_ERROR,
      payload: 'Hãy chọn một life Id để tiếp tục.',
    });
  } else {
    let jsonpolicyDetail = await AsyncStorage.getItem('policyDetail');
    if (jsonpolicyDetail) {
      let policyDetail = [];
      policyDetail = JSON.parse(jsonpolicyDetail);
      policyDetail = policyDetail.filter(
        p => p.lifeIdNum.trim() === lifeIdNum.trim(),
      );
      await AsyncStorage.setItem('policyDetail', JSON.stringify(policyDetail));
    }
    dispatch({type: SIGNIN_CONTINUE, payload: lifeIdNum});
    navigate('ListClaim');
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: SIGNOUT});
  navigate('Signin');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, continueSignin, clearErrorMessage},
  {
    token: null,
    errorMessage: '',
    listLifeIdNum: [],
    lifeIdNum: '',
    policyNumber: '',
    idNumber: '',
    isLoading: false,
  },
);
