import React, {useContext, useEffect} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Context} from '../context/ClaimImageContext';

const TakeImageScreen = ({navigation}) => {
  const {
    state,
    selectImage,
    displayImageAfterSelect,
    deSelectImage,
    UploadImage,
  } = useContext(Context);
  console.log('state at view: ', state);
  const BUTTONSiOS = ['Sử dụng Máy ảnh...', 'Chọn từ thư viện...', 'Hủy'];
  const BUTTONSandroid = ['Sử dụng Máy ảnh...', 'Chọn từ thư viện...', 'Hủy'];
  const DESTRUCTIVE_INDEX = 3;
  const CANCEL_INDEX = 4;

  useEffect(() => {
    displayImageAfterSelect();
    const listener = navigation.addListener('didFocus', () => {
      displayImageAfterSelect();
    });

    return () => {
      listener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onPressAddPhotoBtn = type => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: Platform.OS === 'ios' ? BUTTONSiOS : BUTTONSandroid,
        title: 'Chọn hình',
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: 'blue',
      },
      buttonIndex => {
        onActionSelectPhotoDone(buttonIndex, type);
      },
    );
  };
  const showActionSheet = (index, type) => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Đồng ý', 'Hủy'],
        title: 'Xóa hình đang chọn ?',
        cancelButtonIndex: 1,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        tintColor: 'blue',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          deSelectImage(index, type);
        }
      },
    );
  };

  const onDoUploadPress = () => {
    if (state.isUploading === true) {
      return;
    }
    if (state.images.length > 0) {
      if (state.images[0].type !== 0) {
        UploadImage(navigation.getParam('id'), state.images);
      } else {
        Alert.alert(
          'Thông báo',
          'Quý khách vui lòng chọn hình trước khi upload',
        );
      }
    } else {
      Alert.alert('Thông báo', 'Quý khách vui lòng chọn hình trước khi upload');
    }
  };

  const onActionSelectPhotoDone = (index, type) => {
    switch (index) {
      case 0:
        ImagePicker.openCamera({})
          .then(image => selectImage({type: 13, photos: [image]}))
          .catch(error => {
            console.log(error);
          });
        break;
      case 1:
        ImagePicker.openPicker({
          multiple: true,
          maxFiles: 10,
          mediaType: 'photo',
        })
          .then(images => selectImage({type, photos: images}))
          .catch(error => {
            console.log(error);
          });
        break;
      default:
        break;
    }
  };

  const renderListPhotos = (photos = [], type) => {
    const photo = photos.map((p, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => showActionSheet(index, type)}>
        <Image style={styles.photo} source={{uri: p.path}} />
      </TouchableOpacity>
    ));

    return photo;
  };

  const renderSelectPhotoControl = (localPhotos = []) => {
    const photo13 =
      localPhotos.filter(p => p.type === 13).length > 0
        ? localPhotos.filter(p => p.type === 13)[0].photos
        : [];
    const photo4 =
      localPhotos.filter(p => p.type === 4).length > 0
        ? localPhotos.filter(p => p.type === 4)[0].photos
        : [];
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Chứng minh nhân thân của người thự hưởng
          </Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(13)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo13, 13)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Giấy ra viện</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(4)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo4, 4)}
          </ScrollView>
        </View>
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          {/* <Image
            style={{width: 143, height: 30}}
            source={{
              uri: 'https://tuanitpro.com/wp-content/uploads/2015/04/logo.png',
            }}
          /> */}
          <View style={styles.body}>
            {renderSelectPhotoControl(state.images)}
            <View style={styles.sectionContainer}>
              {state.images.length > 0 && state.images[0].type !== 0 ? (
                <Button
                  buttonStyle={styles.buttonStyle}
                  title="Upload"
                  onPress={onDoUploadPress}
                  loading={state.isUploading}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 15,

    color: Colors.dark,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  section: {
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addPhotoTitle: {
    fontSize: 15,

    fontWeight: 'bold',
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10,
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399cc',
  },
  photoIcon: {
    width: 50,
    height: 50,
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end',
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 48,
  },
  buttonStyle: {
    marginTop: 20,
    borderRadius: 20,
  },
});
TakeImageScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Hình ảnh Thông tin/Chứng từ',
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
export default TakeImageScreen;
