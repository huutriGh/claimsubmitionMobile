import AsyncStorage from '@react-native-community/async-storage';
import claimAPI from '../api/claimsubmition';
import {
  CLAIMSUBMIT_CREATE,
  CLAIMSUBMIT_CREATE_SUCCESS,
  CLAIMSUBMIT_FETCH_SUCCESS,
  CLAIMSUBMIT_REPARE_EDIT,
  CLAIMSUBMIT_SAVE_SUCCESS,
  CLAIMSUBMIT_UPDATE,
  COMPONENT_CHECKED_CHANGE,
  PAYMENT_CHECKED_CHANGE,
  PAYMENT_METHOD_FETCH,
} from '../constant/ActionType';
import createDataContext from './createDataContext';

const INITIAL_CLAIM_STATE = {
  id: null,
  poNumber: null,
  laName: null,
  laIdNumber: null,
  laAddress: null,
  laPhone: null,
  rqName: null,
  rqIdNumber: null,
  rqAddress: null,
  rqPhone: null,
  eventDate: null,
  eventPlace: null,
  eventReason: null,
  benifitType: null,
  dateIn: null,
  dateOut: null,
  diagonostic: null,
  hospital: null,
  doctor: null,
  hospitalHealthIns: null,
  eventDiscription: null,
  paymentMothod: null,
  accountName: null,
  accountIdCardDate: null,
  accountIdCard: null,
  bank: null,
  accountNumber: null,
  accountHolder: null,
  ortherInsurance: false,
  isr1Name: null,
  isr1EffDate: null,
  isr1Amount: null,
  isr2Name: null,
  isr2EffDate: null,
  isr2Amount: null,
  dateSummit: null,
  dateUpdate: null,
  dateDelete: null,
  status: 'PENDING',
  imagePath: null,
};
const INITIAL_PAYMENT_METHOD = [
  {id: '1', title: 'Chuyển vào tài khoản cá nhân', checked: false},
  {id: '2', title: 'Nhận tiền mặt tại TTDVKH', checked: false},
  {id: '3', title: 'Nhận tiền mặt tại Ngân hàng', checked: false},
  {id: '4', title: 'Đóng phí bảo hiểm', checked: false},
];

const claimReducer = (state, action) => {
  switch (action.type) {
    case CLAIMSUBMIT_FETCH_SUCCESS:
      return {
        ...state,
        claimSubmitionHis: action.payload,
      };
    case PAYMENT_METHOD_FETCH:
      return {
        ...state,
        paymentMethods: action.payload,
      };
    case CLAIMSUBMIT_UPDATE:
      const newClaimSubmition = {
        ...state.claimSubmition,
        [action.payload.prop]: action.payload.value,
      };
      return {
        ...state,
        claimSubmition: newClaimSubmition,
      };
    case CLAIMSUBMIT_CREATE:
      return {
        ...state,
        claimSubmition: action.payload.claimSubmition,
        components: action.payload.components,
      };
    case CLAIMSUBMIT_CREATE_SUCCESS:
      return {
        ...state,
        claimSubmition: INITIAL_CLAIM_STATE,
        components: [],
        claimSubmitionHis: [],
        paymentMethods: state.paymentMethods.map(p => {
          return {...p, checked: false};
        }),
      };
    case CLAIMSUBMIT_REPARE_EDIT:
      return {
        ...state,
        claimSubmition: action.payload.claimSubmition,
        components: action.payload.components,
        paymentMethods: action.payload.payments,
      };
    case CLAIMSUBMIT_SAVE_SUCCESS:
      return {
        ...state,
        claimSubmitionHis: state.claimSubmitionHis.map(s => {
          return s.id === action.payload.id ? action.payload : s;
        }),
        paymentMethods: state.paymentMethods.map(p => {
          return {...p, checked: false};
        }),
      };
    case COMPONENT_CHECKED_CHANGE:
      return {
        ...state,
        components: action.payload,
      };
    case PAYMENT_CHECKED_CHANGE:
      return {
        ...state,
        paymentMethods: action.payload,
      };

    default:
      return state;
  }
};
const claimSubmitionCreate = dispatch => async () => {
  const policys = await AsyncStorage.getItem('policyDetail');
  if (policys) {
    let policy = [];
    policy = JSON.parse(policys);
    const components = policy.map(function(p) {
      return {
        componentCode: p.componentCode,
        componentName: p.componentName,
        checked: false,
      };
    });
    let claimSubmition = INITIAL_CLAIM_STATE;
    claimSubmition.poNumber = policy[0].policyNumber;
    claimSubmition.laName = policy[0].poName;
    claimSubmition.laIdNumber = policy[0].poIdNumber;
    claimSubmition.laAddress = policy[0].benefAddress;
    dispatch({
      type: CLAIMSUBMIT_CREATE,
      payload: {claimSubmition, components},
    });
  }
};
const claimSubmitionRepareEdit = dispatch => async (
  claimSubmition = {},
  paymentMethods = INITIAL_PAYMENT_METHOD,
) => {
  const policys = await AsyncStorage.getItem('policyDetail');
  if (policys) {
    let policy = [];
    policy = JSON.parse(policys);
    let components = policy.map(function(p) {
      return {
        componentCode: p.componentCode,
        componentName: p.componentName,
        checked: false,
      };
    });
    const strComponent = claimSubmition.benifitType.split('|');
    components.map(comp => {
      let c = strComponent.find(str => {
        return str === comp.componentCode;
      });
      if (comp.componentCode === c) {
        comp.checked = true;
      }
    });
    const payments = paymentMethods.map(pay => {
      if (pay.id.toString() === claimSubmition.paymentMothod) {
        pay.checked = true;
        return pay;
      } else {
        pay.checked = false;
        return pay;
      }
    });
    dispatch({
      type: CLAIMSUBMIT_REPARE_EDIT,
      payload: {claimSubmition, components, payments},
    });
  }
};
const claimSubmitionUpdate = dispatch => async ({prop, value}) => {
  dispatch({
    type: CLAIMSUBMIT_UPDATE,
    payload: {prop, value},
  });
};
const componentCheckedChange = dispatch => async (components = []) => {
  dispatch({
    type: COMPONENT_CHECKED_CHANGE,
    payload: components,
  });
};
const paymentMethodCheckedChange = dispatch => async (payments = []) => {
  dispatch({
    type: PAYMENT_CHECKED_CHANGE,
    payload: payments,
  });
};

const claimSubmitionInsert = dispatch => async (
  state = {},
  isEdit,
  callback,
) => {
  let strComponent = '';
  let strPaymentMethod = '';
  state.components.map(c => {
    if (c.checked) {
      strComponent = strComponent + c.componentCode + '|';
    }
  });
  state.paymentMethods.map(c => {
    if (c.checked) {
      strPaymentMethod = strPaymentMethod + c.id + '|';
    }
  });
  if (strComponent.length > 0) {
    strComponent = strComponent.substr(0, strComponent.length - 1);
  }
  if (strPaymentMethod.length > 0) {
    strPaymentMethod = strPaymentMethod.substr(0, strPaymentMethod.length - 1);
  }
  let claimsubmition = {
    ...state.claimSubmition,
    benifitType: strComponent,
    paymentMothod: strPaymentMethod,
  };
  let response = null;
  if (isEdit) {
    response = await claimAPI.put(
      `/claimsumitions/${claimsubmition.id}`,
      claimsubmition,
    );
  } else {
    response = await claimAPI.post('/claimsumitions', claimsubmition);
  }

  if (response) {
    if (isEdit) {
      dispatch({
        type: CLAIMSUBMIT_SAVE_SUCCESS,
        payload: response.data,
      });
      // } else {
      //   dispatch({
      //     type: CLAIMSUBMIT_CREATE_SUCCESS,
      //   });
    }
    if (callback) {
      callback();
    }
  }
  // navigate('ListClaim', {
  //   policyNumber: state.claimSubmition.poNumber,
  //   idNumber: '',
  // });
};
const claimSubmitionFetch = dispatch => async (poNumber, idCard) => {
  const response = await claimAPI.get(`/claimsumitions/${poNumber}/${idCard}`);
  if (response) {
    dispatch({
      type: CLAIMSUBMIT_FETCH_SUCCESS,
      payload: response.data,
    });
  }
};
const getPaymentMethods = dispatch => async () => {
  const response = await claimAPI.get('/paymentMethod');
  if (response) {
    dispatch({type: PAYMENT_METHOD_FETCH, payload: response.data});
  }
};
export const {Provider, Context} = createDataContext(
  claimReducer,
  {
    claimSubmitionUpdate,
    claimSubmitionCreate,
    componentCheckedChange,
    paymentMethodCheckedChange,
    claimSubmitionFetch,
    claimSubmitionInsert,
    claimSubmitionRepareEdit,
    getPaymentMethods,
  },
  {
    claimSubmition: INITIAL_CLAIM_STATE,
    components: [],
    paymentMethods: INITIAL_PAYMENT_METHOD,
    claimSubmitionHis: [],
  },
);
