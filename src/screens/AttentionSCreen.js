/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Context} from '../context/PolicyContext';
import {NavigationEvents} from 'react-navigation';
import {Button, Card, Text} from 'react-native-elements';

const AttentionSCreen = ({navigation}) => {
  const {state, getNote} = useContext(Context);
  function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  const genderNoteDetail = (note = []) => {
    const noteHeader = removeDuplicates(note, 'noteID');
    const noteComp = noteHeader.map(n => (
      <View key={n.noteID}>
        <Text key={n.noteID} h4 h4Style={styles.noteHeaderStyle}>
          {`${n.noteOrder}. ${n.noteHeader}`}
        </Text>
        {note
          .filter(item => item.noteID === n.noteID)
          .map(des => (
            <Text key={des.noteDetailId} style={styles.noteDetailStyle}>
              {des.noteDetailDesc}
            </Text>
          ))}
      </View>
    ));
    return (
      <Card title="MỘT SỐ LƯU Ý KHI YÊU CẦU GIẢI QUYẾT QUYỀN LỢI BẢO HIỂM">
        <Text>Thưa quý khách,</Text>
        <Text style={styles.noteDetailStyle}>
          Để đảm bảo quyền lợi của Quý khách, trước khi kê khai đơn "Đơn yêu cầu
          giải quyết quyền lợi bảo hiểm", quý khách vui lòng đọc kỹ những nội
          dung sau đây:
        </Text>
        <View>{noteComp}</View>
        <Button
          buttonStyle={styles.buttonStyle}
          title="Xem bảng hồ sơ chi tiết"
          onPress={() => navigation.navigate('FileRequest')}
        />
      </Card>
    );
  };
  useEffect(() => {
    getNote();
    // const listener = navigation.addListener('didFocus', () => {
    //   getNote();
    // });

    // return () => {
    //   listener.remove();
    // };
  }, []);
  return (
    <>
      {/* <NavigationEvents onWillFocus={getNote} /> */}
      <ScrollView>{genderNoteDetail(state.note)}</ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  noteHeaderStyle: {
    fontSize: 15,
  },
  noteDetailStyle: {
    textAlign: 'justify',
  },
  buttonStyle: {
    marginTop: 20,
  },
});
AttentionSCreen.navigationOptions = () => {
  return {
    header: null,
  };
};
export default AttentionSCreen;
