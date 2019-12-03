import {View, Image, Text, StyleSheet} from 'react-native';
import React from 'react';

const ImageDetail = ({images}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: images.path}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default ImageDetail;
