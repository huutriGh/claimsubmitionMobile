import React, {useContext} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context} from '../context/ClaimSubmitionContext';
import ImageList from './../components/ImageList';
const ShowClaimScreen = ({navigation}) => {
  const {state} = useContext(Context);
  const claim = state.claimSubmitionHis.find(c => {
    return c.id === navigation.getParam('id');
  });
  const filterImageByType = (images = [], type) => {
    if (images === null) {
      return [];
    }
    const filter = images.filter(p => p.type === type);
    return filter;
  };
  const renderImage = (images = []) => {
    return (
      <ScrollView>
        <ImageList
          images={filterImageByType(images, '1')}
          title="Đơn yêu cầu giải quyết quyền lợi bảo hiểm"
        />
        <ImageList
          images={filterImageByType(images, '2')}
          title="Giấy chứng tử"
        />
        <ImageList
          images={filterImageByType(images, '3')}
          title="Giấy báo tử"
        />
        <ImageList
          images={filterImageByType(images, '4')}
          title="Giấy ra viện"
        />
        <ImageList
          images={filterImageByType(images, '5')}
          title="Tóm tắt bệnh án/Kết quả xét nghiệm/X-Quang"
        />
        <ImageList
          images={filterImageByType(images, '6')}
          title="Bảng kê chi tiết viện phí"
        />
        <ImageList
          images={filterImageByType(images, '7')}
          title="Hóa đơn viện phí"
        />
        <ImageList
          images={filterImageByType(images, '8')}
          title="Bản kết luận về tai nạn, Biên bản/sơ đồ hiện trường, Kết luận pháp y"
        />
        <ImageList
          images={filterImageByType(images, '9')}
          title="Tường trình về việc tử vong"
        />
        <ImageList
          images={filterImageByType(images, '10')}
          title="Quyết định tuyên bố tử vong của tòa án"
        />
        <ImageList
          images={filterImageByType(images, '11')}
          title="Bộ hợp đồng"
        />
        <ImageList
          images={filterImageByType(images, '12')}
          title="Hộ khẩu đã xóa tên"
        />
        <ImageList
          images={filterImageByType(images, '13')}
          title="Giấy tờ chưng minh nhân thân của người thụ hưởng"
        />
        <ImageList
          images={filterImageByType(images, '14')}
          title="Giấy khai sinh người được bảo hiểm/Người thụ hưởng(<18t)"
        />
        <ImageList
          images={filterImageByType(images, '15')}
          title="Kết quả giám định y khoa"
        />
        <ImageList
          images={filterImageByType(images, '16')}
          title="Biên bản phân chi di sản(Không có người thụ hưởng)"
        />
        <ImageList
          images={filterImageByType(images, '17')}
          title="Quyết định giám hộ hợp pháp(Người được bảo hiểm mất năng lực hành vi dân sự"
        />
      </ScrollView>
    );
  };

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
        <Card title="Hình ảnh chứng từ">
          {renderImage(JSON.parse(claim.imagePath))}
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
          name="edit"
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
