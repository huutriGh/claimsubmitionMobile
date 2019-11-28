/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import ClaimSubmitForm from '../components/ClaimSubmitForm';
import {Context} from '../context/ClaimSubmitionContext';

const EditClaimScreen = ({navigation}) => {
  const {state, claimSubmitionInsert, claimSubmitionRepareEdit} = useContext(
    Context,
  );

  const getFirstData = () => {
    const claim = state.claimSubmitionHis.find(c => {
      return c.id === navigation.getParam('id');
    });
    claimSubmitionRepareEdit(claim);
  };
  useEffect(() => {
    getFirstData();
    const listener = navigation.addListener('didFocus', () => {
      getFirstData();
    });

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <ClaimSubmitForm
      isEdit={true}
      onSubmit={(stateEdit, isEdit) => {
        claimSubmitionInsert(stateEdit, isEdit, () => navigation.pop());
      }}
    />
  );
};
EditClaimScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Cập nhật thông tin yêu cầu BH',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      // justifyContent: 'space-between',
      // textAlign: 'center',
      // alignSelf: 'center',
    },
  };
};
export default EditClaimScreen;
