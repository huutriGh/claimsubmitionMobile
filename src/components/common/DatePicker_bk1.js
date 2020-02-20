import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {Input} from 'react-native-elements';
import moment from 'moment';

const DatePicker = props => {
  const [state, setState] = useState({
    show: false,
    date: props.value,
    errorMessage: '',
  });
  const showPicker = () => {
    setState({show: true, errorMessage: `Vui long chon ${props.label}`});
  };
  const convertDisPlayDate = (date, isDisplay) => {
    if (date) {
      // const dt = new Date(date);
      if (isDisplay) {
        return moment(date)
          .format('DD-MM-YYYYTHH:mm:ssZZ')
          .substring(0, 19)
          .substring(0, 10);
        // (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()) +
        // '-' +
        // (dt.getMonth() + 1 < 10
        //   ? '0' + (dt.getMonth() + 1)
        //   : dt.getMonth() + 1) +
        // '-' +
        // dt.getFullYear()
      } else {
        return moment(date)
          .format('YYYY-MM-DDTHH:mm:ssZZ')
          .substring(0, 19)
          .substring(0, 10);
        // dt.getFullYear() +
        // '-' +
        // (dt.getMonth() + 1 < 10
        //   ? '0' + (dt.getMonth() + 1)
        //   : dt.getMonth() + 1) +
        // '-' +
        // (dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate())
      }
    }
    return null;
  };
  const setDate = (event, date) => {
    date = date || state.date;
    // console.log('ref: ', ref);
    // console.log('date:', date);
    //setState({errorMessage: `Vui long chon ${props.label}`});

    if (date !== undefined) {
      // Hien thi tren UI
      const valueDisplay = convertDisPlayDate(date, true);
      // Update xuong DB
      const value = convertDisPlayDate(date, false);
      setState({
        show: false,
        date: valueDisplay,
        errorMessage: valueDisplay === '' ? `Vui long chon ${props.label}` : '',
      });

      props.onChangeText({prop: props.name, value});
    } else {
      setState({
        show: false,
        date: props.value === null ? ref : props.value,
        errorMessage: ref ? '' : `Vui long chon ${props.label}`,
      });
      props.onChangeText({prop: props.name, ref});
    }
  };

  const usePrevious = value => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  };
  const ref = usePrevious(state.date);
  Keyboard.dismiss();

  return (
    <>
      {state.show ? (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => setDate(event, date)}
        />
      ) : null}

      <Input
        ref={props.ref}
        label={props.label}
        placeholder={props.placeHolder}
        onFocus={() => {
          showPicker();
        }}
        value={convertDisPlayDate(props.value, true)}
        onChangeText={value => props.onChangeText(value)}
        errorMessage={props.errorMessage}
      />
    </>
  );
};
export {DatePicker};
