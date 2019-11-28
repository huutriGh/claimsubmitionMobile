import React, {useContext} from 'react';
import {NavigationEvents} from 'react-navigation';
import {Linking, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Navlink from '../components/Navlink';
import {Context} from '../context/AuthContext';
import AuthForm from './../components/AuthForm';
import Spacer from '../components/Spacer';
const SigninScreen = () => {
  const {
    state,
    signin,
    signout,
    continueSignin,
    clearErrorMessage,
  } = useContext(Context);
  return (
    <>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="ĐĂNG NHẬP"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText={state.token ? 'Tiếp tục' : 'Đăng nhập'}
        listLifeIdNum={state.listLifeIdNum}
        token={state.token}
        onSingout={signout}
        continueSignin={continueSignin}
        isLoading={state.isLoading}
        poNumber={state.policyNumber}
        idCard={state.idNumber}
      />
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.phuhunglife.com/')}>
        <Spacer>
          <Text style={styles.link}>Bạn chưa có hợp đông bảo hiểm ?</Text>
        </Spacer>
      </TouchableOpacity>
      {/* <Navlink text="Bạn chưa có hợp đông bảo hiểm ?" routeName="Signup" /> */}
    </>
  );
};
const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});
SigninScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

export default SigninScreen;
