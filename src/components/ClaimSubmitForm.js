import {Formik} from 'formik';
import React, {useContext, useState} from 'react';
// import useForm from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card, CheckBox, Input} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, ScrollView} from 'react-navigation';
import * as yup from 'yup';
import {DatePicker} from '../components/common';
import Navlink from '../components/Navlink';
import {Context} from '../context/ClaimSubmitionContext';

const CreateClaimForm = ({navigation, isEdit, initialvalue, onSubmit}) => {
  const {
    state,
    claimSubmitionUpdate,

    componentCheckedChange,
    paymentMethodCheckedChange,
  } = useContext(Context);
  console.log('state:', state);
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
    // rqName: yup.string().required(),
    // rqIdNumber: yup
    //   .string()
    //   .required()
    //   .matches(/^[0-9]{8,15}$/),
    // rqAddress: yup.string().required(),
    // rqPhone: yup.string().required(),
    //Sự kiện bảo hiểm
    eventDate: yup
      .string()
      .nullable()
      .required('Vui lòng nhập ngày xảy ra sự kiện bảo hiểm'),
    // eventPlace: yup.string().required(),
    // eventReason: yup.string().required(),
  });

  const submit = data => {
    console.log('data:', data);
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
          label="Tên Công ty"
          value={state.claimSubmition.isr1Name}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr1Name', value})
          }
        />
        <DatePicker
          placeholder="dd-MM-yyyy"
          label="Ngày Hiệu lực"
          name="isr1EffDate"
          value={state.claimSubmition.isr1EffDate}
          onChangeText={datePickerChange}
        />
        <Input
          label="Số tiền bảo hiểm"
          value={state.claimSubmition.isr1Amount}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr1Amount', value})
          }
        />
        <Input
          label="Tên Công ty"
          value={state.claimSubmition.isr2Name}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr2Name', value})
          }
        />
        <DatePicker
          placeholder="dd-MM-yyyy"
          label="Ngày Hiệu lực"
          name="isr2EffDate"
          value={state.claimSubmition.isr2EffDate}
          onChangeText={datePickerChange}
        />
        <Input
          label="Số tiền bảo hiểm"
          value={state.claimSubmition.isr2Amount}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr2Amount', value})
          }
        />
      </>
    ) : null;
  };
  const renderPaymentMethod = () => {
    let p = state.paymentMethods.filter(pay => pay.checked);
    if (p.length === 0) {
      return null;
    } else {
      p = p[0];
    }

    if (
      (p.id === '1P' && p.checked === true) ||
      (p.id === '4P' && p.checked === true)
    ) {
      return (
        <Card title="Thông tin nhận thanh toán">
          <Input
            label="Tên người nhận tiền"
            value={state.claimSubmition.accountName}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountName', value})
            }
          />
          <Input
            label="Số CMND"
            value={state.claimSubmition.accountIdCard}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountIdCard', value})
            }
          />
          <DatePicker
            label="Ngày cấp"
            placeholder="dd-MM-yyyy"
            name="accountIdCardDate"
            value={state.claimSubmition.accountIdCardDate}
            onChangeText={datePickerChange}
            //errorMessage={errors.eventDate && 'Ngày cấp CMND không hợp lệ.'}
          />
        </Card>
      );
    } else if (p.id === '3P' && p.checked === true) {
      return (
        <Card title="Thông tin nhận thanh toán">
          <Input
            label="Tên và địa chỉ chi nhánh NH"
            multiline
            value={state.claimSubmition.bank}
            onChangeText={value => claimSubmitionUpdate({prop: 'bank', value})}
          />
          <Input
            label="Tên chủ tài khoản"
            value={state.claimSubmition.accountHolder}
            onChangeText={value =>
              claimSubmitionUpdate({prop: 'accountHolder', value})
            }
          />
          <Input
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

  const readerFrom = () => {
    const initial = claimSubmition => {
      return {
        laName: claimSubmition.laName,
        laIdNumber: claimSubmition.laIdNumber,
        laAddress: claimSubmition.laAddress,
        laPhone: claimSubmition.laPhone,
        eventDate: claimSubmition.eventDate,
      };
    };
    return (
      <Formik
        initialValues={initial(state.claimSubmition)}
        onSubmit={values => {
          submit(values);
        }}
        validationSchema={validSchema}
        enableReinitialize>
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Card title="Người xảy ra sự kiện">
              <Input
                name="laName"
                label="Họ tên"
                placeholder="Nguyen Van A"
                value={values.laName}
                onChangeText={value => {
                  handleChange('laName');
                  claimSubmitionUpdate({prop: 'laName', value});
                }}
                onBlur={handleBlur('laName')}
                errorMessage={touched.laName && errors.laName}
              />
              <Input
                name="laIdNumber"
                label="Số CMND"
                value={state.claimSubmition.laIdNumber}
                onChangeText={value => {
                  handleChange('laIdNumber');
                  claimSubmitionUpdate({prop: 'laIdNumber', value});
                }}
                errorMessage={touched.laIdNumber && errors.laIdNumber}
              />
              <Input
                name="laAddress"
                label="Địa chỉ"
                placeholder=""
                value={state.claimSubmition.laAddress}
                onChangeText={value => {
                  handleChange('laAddress');
                  claimSubmitionUpdate({prop: 'laAddress', value});
                }}
                errorMessage={touched.laAddress && errors.laAddress}
              />
              <Input
                name="laPhone"
                label="Điện thoại liên lạc"
                value={state.claimSubmition.laPhone}
                onChangeText={value => {
                  handleChange('laPhone');
                  claimSubmitionUpdate({prop: 'laPhone', value});
                }}
                errorMessage={touched.laPhone && errors.laPhone}
              />
            </Card>
            <Card title="Người yêu cầu bồi thường">
              <Input
                label="Họ tên"
                value={state.claimSubmition.rqName}
                onChangeText={value => {
                  claimSubmitionUpdate({prop: 'rqName', value});
                }}
                // errorMessage={errors.rqName && 'Họ và tên không hợp lệ'}
              />
              <Input
                label="Số CMND"
                value={state.claimSubmition.rqIdNumber}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'rqIdNumber', value})
                }
                // errorMessage={errors.rqIdNumber && 'Số CMND không hợp lệ'}
              />
              <Input
                label="Địa chỉ"
                value={state.claimSubmition.rqAddress}
                onChangeText={value => {
                  claimSubmitionUpdate({prop: 'rqAddress', value});
                }}
                // errorMessage={errors.rqAddress && 'Địa chỉ không hợp lệ'}
              />
              <Input
                label="Điện thoại liên lạc"
                value={state.claimSubmition.rqPhone}
                onChangeText={value => {
                  claimSubmitionUpdate({prop: 'rqPhone', value});
                }}
                // errorMessage={errors.rqPhone && 'Số điện thoại không hợp lệ'}
              />
            </Card>
            <Card title="Loại quyền lợi">
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
                name="eventDate"
                label="Ngày xảy ra sự kiện bảo hiểm"
                placeholder="dd-MM-yyyy"
                value={values.eventDate}
                onChangeText={value => {
                  handleChange('eventDate');
                  claimSubmitionUpdate({prop: 'eventDate', value});
                }}
                onBlur={handleChange('eventDate')}
                errorMessage={touched.eventDate && errors.eventDate}
              />
              <Input
                label="Nơi xảy ra sự kiên bảo hiểm"
                value={state.claimSubmition.eventPlace}
                onChangeText={value => {
                  claimSubmitionUpdate({prop: 'eventPlace', value});
                }}
                // errorMessage={
                //   errors.eventPlace && 'Nơi xảy ra sự kiện không hợp lệ'
                // }
              />
              <Input
                label="Nguyên nhân"
                multiline
                value={state.claimSubmition.eventReason}
                onChangeText={value => {
                  claimSubmitionUpdate({prop: 'eventReason', value});
                }}
                // errorMessage={
                //   errors.eventReason && 'Nguyên nhân sự kiên BH không hợp lệ'
                // }
              />
            </Card>
            <Card title="Thông tin y khoa">
              <DatePicker
                label="Ngày vào viện"
                placeholder="dd-MM-yyyy"
                name="dateIn"
                value={state.claimSubmition.dateIn}
                onChangeText={datePickerChange}
              />
              <DatePicker
                label="Ngày ra viện"
                placeholder="dd-MM-yyyy"
                name="dateOut"
                value={state.claimSubmition.dateOut}
                onChangeText={datePickerChange}
              />
              <Input
                label="chẩn đoán khi ra viện"
                placeholder=""
                multiline
                value={state.claimSubmition.diagonostic}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'diagonostic', value})
                }
              />
              <Input
                label="Nơi điều trị"
                value={state.claimSubmition.hospital}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'hospital', value})
                }
              />
              <Input
                label="Tên bác sĩ điều trị"
                value={state.claimSubmition.doctor}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'doctor', value})
                }
              />
              <Input
                label="Nơi ĐKKCBBD trên thẻ BHYT"
                value={state.claimSubmition.hospitalHealthIns}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'hospitalHealthIns', value})
                }
              />
              <Input
                label="Mô tả diễn tiến sự việc dẫn đến sự kiện bảo hiểm"
                multiline
                value={state.claimSubmition.eventDiscription}
                onChangeText={value =>
                  claimSubmitionUpdate({prop: 'eventDiscription', value})
                }
              />
            </Card>
            <Card title="Chọn phương thức thanh toán">
              {state.paymentMethods.map(p => (
                <CheckBox
                  title={p.title}
                  key={p.id}
                  checked={p.checked}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  onPress={() => togglePaymentCheckbox(p.id)}
                />
              ))}
            </Card>
            {renderPaymentMethod()}
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
                loading={isSubmitting}
              />
            </Card>
          </ScrollView>
        )}
      </Formik>
    );
  };
  return (
    <>
      <SafeAreaView forceInset={{top: 'always'}}>{readerFrom()}</SafeAreaView>
    </>
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
});

//export default withNavigationFocus(CreateClaimScreen);
export default CreateClaimForm;
