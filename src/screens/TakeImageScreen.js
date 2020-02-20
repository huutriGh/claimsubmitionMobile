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
  // console.log('state at view: ', state);
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
        const imagePath = navigation.getParam('imagePath');
        UploadImage(
          navigation.getParam('id'),
          imagePath.length > 0 ? JSON.parse(imagePath) : [],
          state.images,
        );
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
          .then(image => selectImage({type: type, photos: [image]}))
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
    const photo1 =
      localPhotos.filter(p => p.type === 1).length > 0
        ? localPhotos.filter(p => p.type === 1)[0].photos
        : [];
    const photo2 =
      localPhotos.filter(p => p.type === 2).length > 0
        ? localPhotos.filter(p => p.type === 2)[0].photos
        : [];
    const photo3 =
      localPhotos.filter(p => p.type === 3).length > 0
        ? localPhotos.filter(p => p.type === 3)[0].photos
        : [];
    const photo4 =
      localPhotos.filter(p => p.type === 4).length > 0
        ? localPhotos.filter(p => p.type === 4)[0].photos
        : [];
    const photo5 =
      localPhotos.filter(p => p.type === 5).length > 0
        ? localPhotos.filter(p => p.type === 5)[0].photos
        : [];
    const photo6 =
      localPhotos.filter(p => p.type === 6).length > 0
        ? localPhotos.filter(p => p.type === 6)[0].photos
        : [];
    const photo7 =
      localPhotos.filter(p => p.type === 7).length > 0
        ? localPhotos.filter(p => p.type === 7)[0].photos
        : [];
    const photo8 =
      localPhotos.filter(p => p.type === 8).length > 0
        ? localPhotos.filter(p => p.type === 8)[0].photos
        : [];
    const photo9 =
      localPhotos.filter(p => p.type === 9).length > 0
        ? localPhotos.filter(p => p.type === 9)[0].photos
        : [];
    const photo10 =
      localPhotos.filter(p => p.type === 10).length > 0
        ? localPhotos.filter(p => p.type === 10)[0].photos
        : [];
    const photo11 =
      localPhotos.filter(p => p.type === 11).length > 0
        ? localPhotos.filter(p => p.type === 11)[0].photos
        : [];
    const photo12 =
      localPhotos.filter(p => p.type === 12).length > 0
        ? localPhotos.filter(p => p.type === 12)[0].photos
        : [];
    const photo13 =
      localPhotos.filter(p => p.type === 13).length > 0
        ? localPhotos.filter(p => p.type === 13)[0].photos
        : [];
    const photo14 =
      localPhotos.filter(p => p.type === 14).length > 0
        ? localPhotos.filter(p => p.type === 14)[0].photos
        : [];
    const photo15 =
      localPhotos.filter(p => p.type === 15).length > 0
        ? localPhotos.filter(p => p.type === 15)[0].photos
        : [];
    const photo16 =
      localPhotos.filter(p => p.type === 16).length > 0
        ? localPhotos.filter(p => p.type === 16)[0].photos
        : [];
    const photo17 =
      localPhotos.filter(p => p.type === 17).length > 0
        ? localPhotos.filter(p => p.type === 17)[0].photos
        : [];
    return (
      <>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Đơn yêu cầu giải quyết quyền lợi bảo hiểm
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(1)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo1, 1)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Giấy chứng tử</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(2)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo2, 2)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Giấy báo tử</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(3)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo3, 3)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Giấy ra viện</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(4)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo4, 4)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Tóm tắt bệnh án/Kết quả xét nghiệm/X-Quang
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(5)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo5, 5)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Giấy ra viện</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(6)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo6, 6)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hóa đơn viện phí</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(7)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo7, 7)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Bản kết luận về tai nạn, Biên bản/sơ đồ hiện trường, Kết luận pháp y
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(8)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo8, 8)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tường trình về việc tử vong</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(9)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo9, 9)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Quyết định tuyên bố tử vong của tòa án
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(10)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo10, 10)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bộ hợp đồng</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(11)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo11, 11)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hộ khẩu đã xóa tên</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(12)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo12, 12)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Giấy tờ chứng minh nhân thân của người thụ hưởng
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(13)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo13, 13)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {'Giấy khai sinh người được bảo hiểm/Người thụ hưởng(<18t)'}
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(14)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo14, 14)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Kết quả giám định y khoa</Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(15)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo15, 15)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Biên bản phân chi di sản(Không có người thụ hưởng)
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(16)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo16, 16)}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Quyết định giám hộ hợp pháp(Người được bảo hiểm mất năng lực hành vi
            dân sự
          </Text>
          <ScrollView
            style={styles.photoList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => onPressAddPhotoBtn(17)}>
              <View style={[styles.addButton, styles.photo]}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
            {renderListPhotos(photo17, 17)}
          </ScrollView>
        </View>
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
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
    marginBottom: 10,
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
