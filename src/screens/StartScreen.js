import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
const StartScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Signin');
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.containerStyle}>
      <Image
        source={require('../assets/images/Logo_vertical-Gold.png')}
        style={styles.imageStyle}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginLeft: 20,
    marginRight: 20,
  },
  imageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
});
StartScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

export default StartScreen;
