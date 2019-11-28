import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {Input} from 'react-native-elements';
import moment from 'moment';

const DatePicker = ({value, onChangeText, ...rest}) => {
  const [state, setState] = useState({
    show: false,
    date: value,
  });
  const showPicker = () => {
    setState({show: true});
  };
  const convertDisPlayDate = (date, isDisplay) => {
    // console.log('convertDisPlayDate: ', date);
    if (date != null) {
      // console.log('fdafadfsa');
      if (isDisplay) {
        return moment(date)
          .format('DD-MM-YYYYTHH:mm:ssZZ')
          .substring(0, 19)
          .substring(0, 10);
      } else {
        return moment(date)
          .format('YYYY-MM-DDTHH:mm:ssZZ')
          .substring(0, 19)
          .substring(0, 10);
      }
    }
    return null;
  };
  const setDate = event => {
    console.log('date:', event);
    console.log('date:', state.date);

    // console.log('ref: ', ref);
    // date: {"nativeEvent": {"timestamp": 1574235459115}, "type": "set"}
    //date: {"nativeEvent": {}, "type": "dismissed"}
    const date = date || state.date;

    if (event.type === 'set') {
      console.log('event.type:', 'set');
      // Hien thi tren UI
      const valueDisplay = convertDisPlayDate(
        new Date(event.nativeEvent.timestamp),
        true,
      );
      // Update xuong DB
      const valueDB = convertDisPlayDate(
        new Date(event.nativeEvent.timestamp),
        false,
      );
      setState({
        show: false,
        date: valueDisplay,
      });

      onChangeText(valueDB);
    } else {
      console.log('ref:', ref);
      setState({
        show: false,
        // date: value === null ? ref : value,
      });

      //onChangeText(ref);
    }
  };

  const usePrevious = previousvalue => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = previousvalue;
    }, [previousvalue]); // Only re-run if value changes
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
          onChange={event => setDate(event)}
        />
      ) : null}
      <Input
        {...rest}
        onFocus={() => {
          showPicker();
        }}
        value={convertDisPlayDate(value, true)}
      />
    </>
  );
};
export {DatePicker};
