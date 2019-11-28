import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context} from '../context/ClaimSubmitionContext';
const ShowClaimScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const claim = state.claimSubmitionHis.find(c => {
    return c.id === navigation.getParam('id');
  });

  return (
    <View>
      <ScrollView>
        <Card title="Người xảy ra sự kiện">
          <Input label="Họ tên" value={claim.laName} editable={false} />
          <Input label="Số CMND" value={claim.laIdNumber} editable={false} />
          <Input label="Địa chỉ" value={claim.laAddress} editable={false} />
          <Input
            label="Điện thoại liên lạc"
            value={claim.laPhone}
            editable={false}
          />
        </Card>
        <Card title="Người yêu cầu bồi thường">
          <Input label="Họ tên" value={claim.rqName} editable={false} />
          <Input label="Số CMND" value={claim.rqIdNumber} editable={false} />
          <Input label="Địa chỉ" value={claim.rqAddress} editable={false} />
          <Input
            label="Điện thoại liên lạc"
            value={claim.rqPhone}
            editable={false}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

ShowClaimScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Chi tiết',
    headerRight: (
      <TouchableOpacity
        disabled={navigation.getParam('status') === 'PENDING' ? false : true}
        style={styles.iconStyle}
        onPress={() =>
          navigation.navigate('Edit', {id: navigation.getParam('id')})
        }>
        <Icon
          name="pencil"
          size={30}
          color={
            navigation.getParam('status') === 'PENDING' ? '#fff' : '#808080'
          }
        />
      </TouchableOpacity>
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      // justifyContent: 'space-between',
      // textAlign: 'center',
      // alignSelf: 'center',
    },
  };
};
const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 15,
  },
});

export default ShowClaimScreen;
