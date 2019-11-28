import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, Picker, View} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import Spacer from './Spacer';
import {Card, CardSection, Spinner} from './common';

import {SafeAreaView} from 'react-navigation';
// import {getValues} from 'jest-validate/build/condition';

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText,
  token,
  listLifeIdNum,
  onSingout,
  continueSignin,
  isLoading,
  poNumber,
  idCard,
}) => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const [lifeIdNumber, setLifeIdNumber] = useState('');
  const SigninSchema = yup.object().shape({
    po: yup
      .string()
      .required()
      .matches(/^[0-9]{8,8}$/),

    id: yup
      .string()
      .required()
      .matches(/^[0-9]{8,15}$/),
  });
  const {register, handleSubmit, reset, setValue, getValues, errors} = useForm({
    validationSchema: SigninSchema,
  });

  const submit = data => {
    onSubmit({policyNumber: data.po, idNumber: data.id});
  };
  const signout = () => {
    reset({po: '', id: ''});
    setPolicyNumber('');
    setIdNumber('');
    onSingout();
  };
  const renderPicker = (lifeIdNum = []) => {
    return (
      <>
        <Spacer>
          <Text style={styles.textStyle}>
            Chọn người được bảo hiểm để tiếp tục
          </Text>
        </Spacer>
        <Spacer>
          <Picker
            selectedValue={lifeIdNumber}
            style={styles.PickerStyle}
            onValueChange={(itemValue, itemIndex) => {
              setLifeIdNumber(itemValue);
            }}>
            <Picker.Item label="--------------------------" value="" />
            {lifeIdNum.map(l => (
              <Picker.Item
                key={l.lifeIdNum}
                label={l.lifeName}
                value={l.lifeIdNum}
              />
            ))}
          </Picker>
        </Spacer>
        <Spacer>
          <View style={styles.viewStyle}>
            <Button
              disabled={lifeIdNumber === ''}
              buttonStyle={styles.buttonStyle}
              title={submitButtonText}
              onPress={() => continueSignin(lifeIdNumber, poNumber, idCard)}
            />
            <Button
              buttonStyle={styles.buttonStyle}
              title="Hủy bỏ"
              onPress={signout}
            />
          </View>
        </Spacer>
      </>
    );
  };

  const renderButton = () => {
    if (token) {
      return null;
    } else {
      // if (isLoading) {
      //   return (
      //     <CardSection>
      //       <Spacer>
      //         <Spinner size="large" />
      //       </Spacer>
      //     </CardSection>
      //   );
      // }
      // return (
      //   <Spacer>
      //     <Button
      //       buttonStyle={styles.singleButtonStyle}
      //       title={submitButtonText}
      //       onPress={handleSubmit(submit)}
      //     />
      //   </Spacer>
      // );
      return (
        <Spacer>
          <Button
            buttonStyle={styles.singleButtonStyle}
            title={submitButtonText}
            onPress={handleSubmit(submit)}
            loading={isLoading}
          />
        </Spacer>
      );
    }
  };

  useEffect(() => {
    return () => setLifeIdNumber('');
  }, [token]);
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Card>
        <CardSection>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.imageStyle}
          />
        </CardSection>
        <CardSection>
          <Text h3>{headerText}</Text>
        </CardSection>

        <CardSection style={styles.cardSectionStyle}>
          <Spacer>
            <Input
              ref={register({name: 'po'})}
              label="Số hợp đồng"
              value={policyNumber}
              //onChangeText={setPolicyNumber}
              onChangeText={text => {
                setValue('po', text, true);
                setPolicyNumber(getValues().po);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              disabled={token !== null || isLoading === true}
              errorMessage={errors.po && 'Số hợp đồng không hợp lệ'}
            />
          </Spacer>
          <Spacer>
            <Input
              ref={register({name: 'id'})}
              label="Số CMND"
              value={idNumber}
              autoCapitalize="none"
              autoCorrect={false}
              //onChangeText={setIdNumber}
              onChangeText={text => {
                setValue('id', text, true);
                setIdNumber(getValues().id);
              }}
              disabled={token !== null || isLoading === true}
              errorMessage={errors.id && 'Số CMND không hợp lệ'}
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          </Spacer>
          {token ? renderPicker(listLifeIdNum) : null}
          {renderButton()}
        </CardSection>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  imageStyle: {
    marginTop: 15,
    marginBottom: 15,
    width: 200,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardSectionStyle: {
    flexDirection: 'column',
  },
  buttonStyle: {
    borderRadius: 20,
    marginLeft: 10,
    width: 150,
  },
  singleButtonStyle: {
    borderRadius: 20,
  },
  PickerStyle: {
    height: 50,
    width: 200,
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'space-between',
  },
});

export default AuthForm;
