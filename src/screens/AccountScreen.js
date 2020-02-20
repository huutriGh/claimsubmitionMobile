// import {FontAwesome} from '@expo/vector-icons';
import React, {useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon as EIcon, ListItem} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/Feather';
import {Context as AuthContext} from '../context/AuthContext';
Icon;

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Card style={styles.container}>
        <Image
          source={require('../assets/images/Logo_horizontal-Gold.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </Card>
      <Card>
        <TouchableOpacity>
          <ListItem
            title="Ngôn ngữ"
            bottomDivider
            leftIcon={<EIcon name="language" size={28} type="font-awesome" />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={signout}>
          <ListItem
            title="Đăng xuất"
            bottomDivider
            leftIcon={<Icon name="log-out" size={28} />}
          />
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};
AccountScreen.navigationOptions = {
  title: 'Cài đặt',
  tabBarIcon: ({tintColor}) => <Icon name="menu" size={28} color={tintColor} />,
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  buttonStyle: {
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  textStyle: {
    marginBottom: 10,
  },
  imageStyle: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default AccountScreen;
