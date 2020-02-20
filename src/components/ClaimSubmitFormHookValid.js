import React, {useContext, useState} from 'react';
import useForm from 'react-hook-form';
// import useForm from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Card, CheckBox, Input} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView, ScrollView} from 'react-navigation';
import * as yup from 'yup';
import {Context} from '../context/ClaimSubmitionContext';
import {DatePicker} from './common';
import Navlink from './Navlink';
const ClaimSubmitFormHookValid = ({
  navigation,
  isEdit,
  initialvalue,
  onSubmit,
}) => {
  const {
    state,
    claimSubmitionUpdate,
    componentCheckedChange,
    paymentMethodCheckedChange,
    changeStatus,
  } = useContext(Context);
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
  const {register, handleSubmit, setValue, errors} = useForm({
    validationSchema: validSchema,
    defaultValues: state.claimSubmition,
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
          label="Tên Công ty"
          value={state.claimSubmition.isr1Name}
          onChangeText={value =>
            claimSubmitionUpdate({prop: 'isr1Name', value})
          }
        />
        <DatePicker
          placeholder="dd-MM-yyyy"
          label="Ngày Hiệu lực"
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
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card title="Người xảy ra sự kiện">
          <Input
            ref={register({name: 'laName'})}
            label="Họ tên"
            placeholder="Nguyen Van A"
            value={state.claimSubmition.laName}
            onChangeText={value => {
              setValue('laName', value, true);
              claimSubmitionUpdate({prop: 'laName', value});
            }}
            errorMessage={errors.laName && 'fdalfkjdsalfk'}
          />
          <Input
            ref={register({name: 'laIdNumber'})}
            label="Số CMND"
            value={state.claimSubmition.laIdNumber}
            onChangeText={value => {
              setValue('laIdNumber', value, true);
              claimSubmitionUpdate({prop: 'laIdNumber', value});
            }}
            errorMessage={errors.laIdNumber && 'fdalfkjdsalfk'}
          />
          <Input
            ref={register({name: 'laAddress'})}
            label="Địa chỉ"
            placeholder=""
            value={state.claimSubmition.laAddress}
            onChangeText={value => {
              setValue('laAddress', value, true);
              claimSubmitionUpdate({prop: 'laAddress', value});
            }}
            errorMessage={errors.laAddress && 'fdalfkjdsalfk'}
          />
          <Input
            ref={register({name: 'laPhone'})}
            label="Điện thoại liên lạc"
            value={state.claimSubmition.laPhone}
            onChangeText={value => {
              setValue('laPhone', value, true);
              claimSubmitionUpdate({prop: 'laPhone', value});
            }}
            errorMessage={errors.laPhone && 'fdalfkjdsalfk'}
          />
        </Card>
        <Card title="Người yêu cầu bồi thường">
          <Input
            ref={register({name: 'rqName'})}
            label="Họ tên"
            value={state.claimSubmition.rqName}
            onChangeText={value => {
              setValue('rqName', value, true);
              claimSubmitionUpdate({prop: 'rqName', value});
            }}
            errorMessage={errors.rqName && 'fdalfkjdsalfk'}
          />
          <Input
            ref={register({name: 'rqIdNumber'})}
            label="Số CMND"
            value={state.claimSubmition.rqIdNumber}
            onChangeText={value => {
              setValue('rqIdNumber', value, true);
              claimSubmitionUpdate({prop: 'rqIdNumber', value});
            }}
            errorMessage={errors.rqIdNumber}
          />
          <Input
            ref={register({name: 'rqAddress'})}
            label="Địa chỉ"
            value={state.claimSubmition.rqAddress}
            onChangeText={value => {
              setValue('rqAddress', value, true);
              claimSubmitionUpdate({prop: 'rqAddress', value});
            }}
            errorMessage={errors.rqAddress && 'fdalfkjdsalfk'}
          />
          <Input
            label="Điện thoại liên lạc"
            value={state.claimSubmition.rqPhone}
            onChangeText={value => {
              setValue('rqPhone', value, true);
              claimSubmitionUpdate({prop: 'rqPhone', value});
            }}
            errorMessage={errors.rqPhone && 'fdalfkjdsalfk'}
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
            label="Ngày xảy ra sự kiện bảo hiểm"
            placeholder="dd-MM-yyyy"
            value={state.claimSubmition.eventDate}
            onChangeText={value => {
              claimSubmitionUpdate({prop: 'eventDate', value});
            }}
            // errorMessage={touched.eventDate && errors.eventDate}
          />
          <Input
            label="Nơi xảy ra sự kiên bảo hiểm"
            value={state.claimSubmition.eventPlace}
            onChangeText={value => {
              claimSubmitionUpdate({prop: 'eventPlace', value});
            }}
          />
          <Input
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
            refer={register({name: 'dateIn'})}
            label="Ngày vào viện"
            placeholder="dd-MM-yyyy"
            value={state.claimSubmition.dateIn}
            onChangeText={value => {
              setValue('dateIn', value, true);
              claimSubmitionUpdate({prop: 'dateIn', value});
            }}
            errorMessage={errors.dateIn && 'fdalfkjdsalfk'}
          />
          <DatePicker
            ref={register({name: 'dateOut'})}
            label="Ngày ra viện"
            placeholder="dd-MM-yyyy"
            value={state.claimSubmition.dateOut}
            onChangeText={value => {
              setValue('dateOut', value, true);
              claimSubmitionUpdate({prop: 'dateOut', value});
            }}
            errorMessage={errors.dateOut}
          />
          <Input
            ref={register({name: 'diagonostic'})}
            label="chẩn đoán khi ra viện"
            placeholder=""
            multiline
            value={state.claimSubmition.diagonostic}
            onChangeText={value => {
              setValue('diagonostic', value, true);
              claimSubmitionUpdate({prop: 'diagonostic', value});
            }}
            errorMessage={errors.diagonostic && 'fdalfkjdsalfk'}
          />
          <Input
            ref={register({name: 'hospital'})}
            label="Nơi điều trị"
            value={state.claimSubmition.hospital}
            onChangeText={value => {
              setValue('hospital');
              claimSubmitionUpdate({prop: 'hospital', value});
            }}
            errorMessage={errors.hospital}
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
            onPress={handleSubmit(submit)}
            loading={state.isSubmitting}
          />
        </Card>
      </ScrollView>
    );
  };
  return (
    <>
      <SafeAreaView forceInset={{top: 'always'}}>
        {readerFrom(state)}
      </SafeAreaView>
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
export default ClaimSubmitFormHookValid;
