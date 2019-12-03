import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {BASE_URL} from '../constant/ActionType';

const ImageList = ({title, images = []}) => {
  if (!images.length) {
    return null;
  }
  console.log('images', images);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={images}
        keyExtractor={photo => photo.path}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          console.log(item.path);
          return (
            <View style={styles.view}>
              <Image
                style={styles.image}
                source={{uri: `${BASE_URL}/Images/${item.path}`}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  view: {
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
  },
});
export default ImageList;
