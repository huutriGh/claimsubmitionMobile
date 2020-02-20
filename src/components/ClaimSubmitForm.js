import {Formik} from 'formik';
import React, {useContext, useState} from 'react';
// import useForm from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Card, CheckBox, Input} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, ScrollView} from 'react-navigation';
import * as yup from 'yup';
import {DatePicker} from '../components/common';
import Navlink from '../components/Navlink';
import {Context} from '../context/ClaimSubmitionContext';
import Spacer from './Spacer';

const CreateClaimForm = ({navigation, isEdit, initialvalue, onSubmit}) => {
  const {
    state,
    claimSubmitionUpdate,
    componentCheckedChange,
    paymentMethodCheckedChange,
    changeStatus,
  } = useContext(Context);
  // console.log('state:', state);
  const validSchema = yup.object().shape({
    //Người xảy ra sự kiện
    laName: yup
      .string()
      .nullable()
      .required('Vui lòng nhập Họ và tên'),
    laIdNumber: yup
      .string()
      .nullable()
      .required('Vui lòng nhập số CMND')
      .matches(/^[0-9]{8,15}$/, 'Số CMND không hợp lệ'),
    laAddress: yup
      .string()
      .nullable()
      .required('Vui lòng nhập địa chỉ'),
    laPhone: yup
      .string()
      .nullable()
      .required('Vui lòng nhập số điện thoại'),
    // Người yêu cầu bồi thường
    rqName: yup
      .string()
      .nullable()
      .required('Vui lòng nhập Họ và tên'),
    rqIdNumber: yup
      .string()
      .nullable()
      .matches(/^[0-9]{8,15}$/, 'Số CMND không hợp lệ')
      .required('Vui lòng nhập số CMND'),
    rqAddress: yup
      .string()
      .nullable()
      .required('Vui lòng nhập địa chỉ'),
    rqPhone: yup
      .string()
      .nullable()
      .required('Vui lòng nhập số điện thoại'),
    dateIn: yup
      .string()
      .nullable()
      .required('Vui lòng nhập ngày vào viện'),
    dateOut: yup
      .string()
      .nullable()
      .required('Vui lòng nhập ngày ra viện'),
    diagonostic: yup
      .string()
      .nullable()
      .required('Vui lòng nhập chẩn đoán ra viện'),
    hospital: yup
      .string()
      .nullable()
      .required('Vui lòng nhập nơi điều trị'),
  });

  const submit = data => {
    if (state.components.filter(c => c.checked === true).length === 0) {
      changeStatus(false, 'Quý khách vui lòng chọn loại quyền lợi.');
    } else if (
      state.paymentMethods.filter(c => c.checked === true).length === 0
    ) {
      changeStatus(false, 'Quý khách vui lòng chọn hình thức nhận tiền.');
    } else {
      onSubmit(state, isEdit);
    }
  };
  const [ortherInsurance, setortherInsurance] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const datePickerChange = ({prop, value}) => {
    claimSubmitionUpdate({prop, value});
  };
  const toggleComponentCheckbox = id => {
    const changedCheckbox = state.components.find(
      cb => cb.componentCode === id,
    );
    changedCheckbox.checked = !changedCheckbox.checked;
    componentCheckedChange(state.components);
  };
  const toggleOrtherInsuranceCheckbox = id => {
    if (id === 1) {
      setortherInsurance(!ortherInsurance);
    } else {
      setortherInsurance(false);
    }
  };
  const togglePaymentCheckbox = id => {
    // const changedCheckbox = state.paymentMethods.find(cb => cb.id === id);
    // changedCheckbox.checked = !changedCheckbox.checked;
    // paymentMethodCheckedChange(state.paymentMethods);

    state.paymentMethods.map(p => {
      if (p.id === id) {
        p.checked = !p.checked;
      } else {
        p.checked = false;
      }
    });

    paymentMethodCheckedChange(state.paymentMethods);
  };
  const renderOrtherInsurances = () => {
    return ortherInsurance ? (
      <>
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'building',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          label="Tên Công ty"
          value={state.claimSubmition.isr1Name}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr1Name', value})
          }
        />
        <DatePicker
          leftIcon={{
            type: 'font-awesome',
            name: 'calendar',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          placeholder="dd-MM-yyyy"
          label="Ngày Hiệu lực"
          name="isr1EffDate"
          value={state.claimSubmition.isr1EffDate}
          onChangeText={datePickerChange}
        />
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'money',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          label="Số tiền bảo hiểm"
          value={state.claimSubmition.isr1Amount}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr1Amount', value})
          }
        />
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'building',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          label="Tên Công ty"
          value={state.claimSubmition.isr2Name}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr2Name', value})
          }
        />
        <DatePicker
          leftIcon={{
            type: 'font-awesome',
            name: 'calendar',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          placeholder="dd-MM-yyyy"
          label="Ngày Hiệu lực"
          name="isr2EffDate"
          value={state.claimSubmition.isr2EffDate}
          onChangeText={datePickerChange}
        />
        <Input
          leftIcon={{
            type: 'font-awesome',
            name: 'money',
            color: '#c0972e',
          }}
          leftIconContainerStyle={styles.iconStyle}
          label="Số tiền bảo hiểm"
          value={state.claimSubmition.isr2Amount}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr2Amount', value})
          }
        />
      </>
    ) : null;
  };
  const renderPaymentMethod = (handleChange, values, touched, errors) => {
    let p =
      state.paymentMethods.length > 0
        ? state.paymentMethods.filter(pay => pay.checked)
        : [];
    if (p.length === 0) {
      return null;
    } else {
      p = p[0];
    }

    if (
      (p.id === 2 && p.checked === true) ||
      (p.id === 3 && p.checked === true)
    ) {
      return (
        <Card title="Thông tin nhận thanh toán">
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            label="Tên người nhận tiền"
            value={state.claimSubmition.accountName}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountName', value})
            }
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'id-card',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            label="Số CMND"
            value={state.claimSubmition.accountIdCard}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountIdCard', value})
            }
          />
          <DatePicker
            leftIcon={{
              type: 'font-awesome',
              name: 'calendar',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            name="accountIdCardDate"
            label="Ngày cấp"
            placeholder="dd-MM-yyyy"
            value={state.claimSubmition.accountIdCardDate}
            onChangeText={value => {
              claimSubmitionUpdate({prop: 'accountIdCardDate', value});
            }}
          />
        </Card>
      );
    } else if (p.id === 1 && p.checked === true) {
      return (
        <Card title="Thông tin nhận thanh toán">
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'university',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            label="Tên và địa chỉ chi nhánh NH"
            multiline
            value={state.claimSubmition.bank}
            onChangeText={value => claimSubmitionUpdate({prop: 'bank', value})}
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'user',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            label="Tên chủ tài khoản"
            value={state.claimSubmition.accountHolder}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountHolder', value})
            }
          />
          <Input
            leftIcon={{
              type: 'font-awesome',
              name: 'id-card',
              color: '#c0972e',
            }}
            leftIconContainerStyle={styles.iconStyle}
            label="Số tài khoản"
            value={state.claimSubmition.accountNumber}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountNumber', value})
            }
          />
        </Card>
      );
    } else {
      return null;
    }
  };
  const initValue = {
    laName: initialvalue.laName,
    laIdNumber: initialvalue.laIdNumber,
    laAddress: initialvalue.laAddress,
    laPhone: initialvalue.laPhone,
    rqName: initialvalue.rqName,
    rqIdNumber: initialvalue.rqIdNumber,
    rqAddress: initialvalue.rqAddress,
    rqPhone: initialvalue.laPhone,
    dateIn: initialvalue.dateIn,
    dateOut: initialvalue.dateOut,
    hospital: initialvalue.hospital,
    diagonostic: initialvalue.diagonostic,
  };
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always">
        <Formik
          initialValues={initValue}
          onSubmit={values => {
            submit(values);
          }}
          validationSchema={validSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <>
              <Card title="Người xảy ra sự kiện">
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'user',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="laName"
                  label="Họ tên (*)"
                  placeholder="Nguyen Van A"
                  value={state.claimSubmition.laName}
                  onChangeText={value => {
                    setFieldValue('laName', value, true);
                    claimSubmitionUpdate({prop: 'laName', value});
                  }}
                  onBlur={handleBlur('laName')}
                  errorMessage={touched.laName && errors.laName}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'id-card',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="laIdNumber"
                  label="Số CMND (*)"
                  value={state.claimSubmition.laIdNumber}
                  onChangeText={value => {
                    setFieldValue('laIdNumber', value, true);
                    claimSubmitionUpdate({prop: 'laIdNumber', value});
                  }}
                  onBlur={handleBlur('laIdNumber')}
                  errorMessage={touched.laIdNumber && errors.laIdNumber}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'address-card',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="laAddress"
                  label="Địa chỉ (*)"
                  placeholder=""
                  value={state.claimSubmition.laAddress}
                  onChangeText={value => {
                    setFieldValue('laAddress', value, true);
                    claimSubmitionUpdate({prop: 'laAddress', value});
                  }}
                  onBlur={handleBlur('laAddress')}
                  errorMessage={touched.laAddress && errors.laAddress}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'phone',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="laPhone"
                  label="Điện thoại liên lạc (*)"
                  value={state.claimSubmition.laPhone}
                  onChangeText={value => {
                    setFieldValue('laPhone', value, true);
                    claimSubmitionUpdate({prop: 'laPhone', value});
                  }}
                  onBlur={handleBlur('laPhone')}
                  errorMessage={touched.laPhone && errors.laPhone}
                />
              </Card>
              <Card title="Người yêu cầu bồi thường">
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'user',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="rqName"
                  label="Họ tên (*)"
                  value={state.claimSubmition.rqName}
                  onChangeText={value => {
                    //
                    setFieldValue('rqName', value, true);
                    claimSubmitionUpdate({prop: 'rqName', value});
                  }}
                  onBlur={handleBlur('rqName')}
                  errorMessage={touched.rqName && errors.rqName}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'id-card',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="rqIdNumber"
                  label="Số CMND (*)"
                  value={state.claimSubmition.rqIdNumber}
                  onChangeText={value => {
                    setFieldValue('rqIdNumber', value, true);
                    claimSubmitionUpdate({prop: 'rqIdNumber', value});
                  }}
                  onBlur={handleBlur('rqIdNumber')}
                  errorMessage={touched.rqIdNumber && errors.rqIdNumber}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'address-card',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="rqAddress"
                  label="Địa chỉ (*)"
                  value={state.claimSubmition.rqAddress}
                  onChangeText={value => {
                    setFieldValue('rqAddress', value, true);
                    claimSubmitionUpdate({prop: 'rqAddress', value});
                  }}
                  onBlur={handleBlur('rqAddress')}
                  errorMessage={touched.rqAddress && errors.rqAddress}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'phone',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="rqPhone"
                  label="Điện thoại liên lạc (*)"
                  value={state.claimSubmition.rqPhone}
                  onChangeText={value => {
                    setFieldValue('rqPhone', value, true);
                    claimSubmitionUpdate({prop: 'rqPhone', value});
                  }}
                  onBlur={handleBlur('rqPhone')}
                  errorMessage={touched.rqPhone && errors.rqPhone}
                />
              </Card>
              <Card title="Loại quyền lợi (*)">
                {state.components.map(c => (
                  <CheckBox
                    title={c.componentName}
                    key={c.componentCode}
                    // checked={c.checked === 'true' ? true : false}
                    checked={c.checked}
                    onPress={() => toggleComponentCheckbox(c.componentCode)}
                  />
                ))}
              </Card>
              <Card title="Sự kiện bảo hiểm">
                <DatePicker
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'calendar',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="eventDate"
                  label="Ngày xảy ra sự kiện bảo hiểm"
                  placeholder="dd-MM-yyyy"
                  value={state.claimSubmition.eventDate}
                  onChangeText={value => {
                    claimSubmitionUpdate({prop: 'eventDate', value});
                  }}
                  // errorMessage={touched.eventDate && errors.eventDate}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'location-arrow',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  label="Nơi xảy ra sự kiên bảo hiểm"
                  value={state.claimSubmition.eventPlace}
                  onChangeText={value => {
                    claimSubmitionUpdate({prop: 'eventPlace', value});
                  }}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'file',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  label="Nguyên nhân"
                  multiline
                  value={state.claimSubmition.eventReason}
                  onChangeText={value => {
                    claimSubmitionUpdate({prop: 'eventReason', value});
                  }}
                />
              </Card>
              <Card title="Thông tin y khoa">
                <DatePicker
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'calendar',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="dateIn"
                  label="Ngày vào viện (*)"
                  placeholder="dd-MM-yyyy"
                  value={state.claimSubmition.dateIn}
                  onChangeText={value => {
                    setFieldValue('dateIn', value, true);
                    claimSubmitionUpdate({prop: 'dateIn', value});
                  }}
                  onBlur={handleBlur('dateIn')}
                  errorMessage={touched.dateIn && errors.dateIn}
                />
                <DatePicker
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'calendar',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="dateOut"
                  label="Ngày ra viện (*)"
                  placeholder="dd-MM-yyyy"
                  value={state.claimSubmition.dateOut}
                  onChangeText={value => {
                    setFieldValue('dateOut', value, true);
                    claimSubmitionUpdate({prop: 'dateOut', value});
                  }}
                  onBlur={handleBlur('dateOut')}
                  errorMessage={touched.dateOut && errors.dateOut}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'stethoscope',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="diagonostic"
                  label="chẩn đoán khi ra viện (*)"
                  placeholder=""
                  multiline
                  value={state.claimSubmition.diagonostic}
                  onChangeText={value => {
                    setFieldValue('diagonostic', value, true);
                    claimSubmitionUpdate({prop: 'diagonostic', value});
                  }}
                  onBlur={handleBlur('diagonostic')}
                  errorMessage={touched.diagonostic && errors.diagonostic}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'h-square',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  name="hospital"
                  label="Nơi điều trị (*)"
                  value={state.claimSubmition.hospital}
                  onChangeText={value => {
                    setFieldValue('hospital', value, true);
                    claimSubmitionUpdate({prop: 'hospital', value});
                  }}
                  onBlur={handleBlur('hospital')}
                  errorMessage={touched.hospital && errors.hospital}
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'user-md',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  label="Tên bác sĩ điều trị"
                  value={state.claimSubmition.doctor}
                  onChangeText={value =>
                    claimSubmitionUpdate({prop: 'doctor', value})
                  }
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'h-square',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  label="Nơi ĐKKCBBD trên thẻ BHYT"
                  value={state.claimSubmition.hospitalHealthIns}
                  onChangeText={value =>
                    claimSubmitionUpdate({prop: 'hospitalHealthIns', value})
                  }
                />
                <Input
                  leftIcon={{
                    type: 'font-awesome',
                    name: 'forward',
                    color: '#c0972e',
                  }}
                  leftIconContainerStyle={styles.iconStyle}
                  label="Mô tả diễn tiến sự việc dẫn đến sự kiện bảo hiểm"
                  multiline
                  value={state.claimSubmition.eventDiscription}
                  onChangeText={value =>
                    claimSubmitionUpdate({prop: 'eventDiscription', value})
                  }
                />
              </Card>
              <Card title="Chọn phương thức thanh toán (*)">
                {state.paymentMethods.length > 0
                  ? state.paymentMethods.map(p => (
                      <CheckBox
                        title={p.title}
                        key={p.id}
                        checked={p.checked}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={() => togglePaymentCheckbox(p.id)}
                      />
                    ))
                  : null}
              </Card>
              {renderPaymentMethod(handleChange, errors, touched, values)}
              <Card title="Được bảo hiểm bởi công ty khác ?">
                <View style={styles.viewStyle}>
                  <CheckBox
                    id={1}
                    title="có"
                    checked={ortherInsurance}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPress={() => toggleOrtherInsuranceCheckbox(1)}
                  />
                  <CheckBox
                    id={0}
                    title="không"
                    checked={!ortherInsurance}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    onPress={() => toggleOrtherInsuranceCheckbox(1)}
                  />
                </View>

                {renderOrtherInsurances()}
              </Card>
              <Card title="Đồng ý điều khoản">
                <Spacer>
                  <Text>(*) Thông tin bắt buộc</Text>
                </Spacer>
                <CheckBox
                  title={
                    <Navlink
                      text="Đồng ý với Điều khoản."
                      routeName={'EditTeamAndPolicty'}
                    />
                  }
                  checked={acceptPolicy}
                  onPress={() => setAcceptPolicy(!acceptPolicy)}
                />
                <Button
                  buttonStyle={styles.buttonStyle}
                  title={isEdit ? 'Lưu lại' : 'Gửi yêu cầu'}
                  disabled={!acceptPolicy}
                  // onPress={() => {
                  //   console.log('formstate:', formState);
                  //   handleSubmit(submit);
                  // }}
                  onPress={handleSubmit}
                  loading={state.isSubmitting}
                />
              </Card>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  textStyle: {
    marginLeft: 7,
    fontFamily: 'FontAwesome',
    fontSize: 15,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  datePickerStyle: {
    width: 300,
    fontSize: 15,
  },
  viewStyle: {flexDirection: 'row', justifyContent: 'space-around'},
  iconStyle: {
    marginRight: 15,
    marginLeft: 0,
  },
});

//export default withNavigationFocus(CreateClaimScreen);
export default CreateClaimForm;
