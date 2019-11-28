import React, {useContext, useEffect} from 'react';
import ClaimSubmitForm from '../components/ClaimSubmitForm';
import {Context} from '../context/ClaimSubmitionContext';
const CreateClaimScreen = ({navigation}) => {
  const {claimSubmitionInsert, claimSubmitionCreate} = useContext(Context);
  useEffect(() => {
    claimSubmitionCreate();
    const listener = navigation.addListener('didFocus', () => {
      claimSubmitionCreate();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ClaimSubmitForm
      isEdit={false}
      onSubmit={(stateEdit, isEdit) => {
        claimSubmitionInsert(stateEdit, isEdit, () =>
          navigation.navigate('Index'),
        );
      }}
    />
  );
};
CreateClaimScreen.navigationOptions = {
  title: 'Yêu cầu giải quyết bảo hiểm',
  headerStyle: {
    backgroundColor: '#c0972e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignSelf: 'center',
  },

  // headerShown: false,
  // tabBarIcon: ({tintColor}) => (
  //   <Icon name="plus-circle" size={28} color={tintColor} />
  // ),
};

export default CreateClaimScreen;
