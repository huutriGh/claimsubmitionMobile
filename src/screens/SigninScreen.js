import React, {useContext} from 'react';
import {NavigationEvents} from 'react-navigation';
import {Context} from '../context/AuthContext';
import AuthForm from './../components/AuthForm';
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
    </>
  );
};
// const styles = StyleSheet.create({
//   link: {
//     color: 'blue',
//   },
// });
SigninScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

export default SigninScreen;
