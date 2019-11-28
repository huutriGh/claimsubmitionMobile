import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Card, Text} from 'react-native-elements';

const TermAndPolictyScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.textStyle}>
          Tôi cam kết rằng tất cả nội dung trong Đơn này là đầy đủ, đúng sự
          thật, không bỏ sót nội dung quan trọng nào và hoàn toàn chịu trách
          nhiệm trước pháp luật về tính xác thực của những thông tin nêu trên.
          Để có đủ cơ sở thẩm định, tôi sẵn sàng cung cấp hồ sơ khác khi công ty
          yêu cầu.
        </Text>
        <Text style={styles.textStyle}>
          Tôi đồng ý ủy quyền Công ty và các công ty tái bảo hiểm của Công ty
          liên hệ và thu thập mọi thông tin về Người được bảo hiểm/Bên mua bảo
          hiểm từ các bác sĩ được phép hành nghề, bác sĩ ngành y, bệnh viện,
          phòng khám hoặc các cơ sở y tế liên quan, công ty bảo hiểm hoặc các cơ
          quan, tổ chức hoặc cá nhân khác có hồ sơ hoặc biết về Người được bảo
          hiểm/Bên mua bảo hiểm hoặc sức khỏe của Người được bảo hiểm/Bên mua
          bảo hiểm. Bản copy của phần ủy quyền này có giá trị như bản gốc.
        </Text>
      </Card>
    </ScrollView>
  );
};
TermAndPolictyScreen.navigationOptions = {
  title: 'Điều khoản',
  headerStyle: {
    backgroundColor: '#c0972e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
};
const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'justify',
    fontSize: 15,
  },
});
export default TermAndPolictyScreen;
