import {Col, Row, Grid} from 'react-native-easy-grid';
import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

// const list = [
//   {
//     id: 1,
//     name: 'Đơn yêu cầu giải quyết quyền lợi bảo hiểm',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 2,
//     name: 'Giấy chứng tử',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 3,
//     name: 'Giấy báo tử',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+/-',
//       matTich: '',
//     },
//   },
//   {
//     id: 4,
//     name: 'Giấy ra viện',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+',
//       matTich: '',
//     },
//   },
//   {
//     id: 5,
//     name: 'Tóm tắt bệnh án/Kết quả xét nghiệm/X-Quang',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+/-',
//       matTich: '',
//     },
//   },
//   {
//     id: 6,
//     name: 'Bảng kê chi tiết viện phí',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+/-',
//       matTich: '',
//     },
//   },
//   {
//     id: 7,
//     name: 'Hóa đơn viện phí',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+/-',
//       matTich: '',
//     },
//   },
//   {
//     id: 8,
//     name:
//       'Bản kết luận về tai nạn, Biên bản/sơ đồ hiện trường, Kết luận pháp y',
//     column: {
//       taiNan: '+',
//       benhLy: '',
//       matTich: '',
//     },
//   },
//   {
//     id: 9,
//     name: 'Tường trình về việc tử vong',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 10,
//     name: 'Quyết định tuyên bố tử vong của tòa án',
//     column: {
//       taiNan: '',
//       benhLy: '',
//       matTich: '+',
//     },
//   },
//   {
//     id: 11,
//     name: 'Bộ hợp đồng',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 12,
//     name: 'Hộ khẩu đã xóa tên',
//     column: {
//       taiNan: '+/-',
//       benhLy: '+/-',
//       matTich: '+/-',
//     },
//   },
//   {
//     id: 13,
//     name: 'Giấy tờ chưng minh nhân thân của người thụ hưởng',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 14,
//     name: 'Giấy khai sinh người được bảo hiểm/Người thụ hưởng(<18t)',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 15,
//     name: 'Kết quả giám định y khoa',
//     column: {
//       taiNan: '',
//       benhLy: '',
//       matTich: '',
//     },
//   },
//   {
//     id: 16,
//     name: 'Biên bản phân chi di sản(Không có người thụ hưởng)',
//     column: {
//       taiNan: '+',
//       benhLy: '+',
//       matTich: '+',
//     },
//   },
//   {
//     id: 17,
//     name:
//       'Quyết định giám hộ hợp pháp(Người được bảo hiểm mất năng lực hành vi dân sự',
//     column: {
//       taiNan: '',
//       benhLy: '',
//       matTich: '',
//     },
//   },
// ];
const renderThreeColumn = (files = []) => {
  return (
    <Grid>
      <Row>
        <Col size={110} style={styles.col1Style}>
          <Text style={styles.textHeaderCol1Style}>Hồ sơ yêu cầu</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Tai nạn</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Bệnh lý</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Mất tích</Text>
        </Col>
      </Row>
      {files.map((l, i) => (
        <Row key={i}>
          <Col size={110} style={styles.col1Style}>
            <Text>{l.componentFilename}</Text>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Text style={styles.textStyle}>{l.accident}</Text>
          </Col>
          <Col style={styles.colStyle} size={20}>
            <Text style={styles.textStyle}>{l.pathological}</Text>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Text style={styles.textStyle}>{l.missing}</Text>
          </Col>
        </Row>
      ))}
    </Grid>
  );
};
const renderTwoColumn = (files = []) => {
  return (
    <Grid>
      <Row>
        <Col size={110} style={styles.col1Style}>
          <Text style={styles.textHeaderCol1Style}>Hồ sơ yêu cầu</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Tai nạn</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Bệnh lý</Text>
        </Col>
      </Row>
      {files.map((l, i) => (
        <Row key={i}>
          <Col size={110} style={styles.col1Style}>
            <Text>{l.componentFilename}</Text>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Text style={styles.textStyle}>{l.accident}</Text>
          </Col>
          <Col style={styles.colStyle} size={20}>
            <Text style={styles.textStyle}>{l.pathological}</Text>
          </Col>
        </Row>
      ))}
    </Grid>
  );
};
const renderOneColumn = (files = []) => {
  return (
    <Grid>
      <Row>
        <Col size={110} style={styles.col1Style}>
          <Text style={styles.textHeaderCol1Style}>Hồ sơ yêu cầu</Text>
        </Col>
        <Col size={20} style={styles.colStyle}>
          <Text style={styles.textHeaderColStyle}>Bệnh hiểm nghèo</Text>
        </Col>
      </Row>
      {files.map((l, i) => (
        <Row key={i}>
          <Col size={110} style={styles.col1Style}>
            <Text>{l.componentFilename}</Text>
          </Col>
          <Col size={20} style={styles.colStyle}>
            <Text style={styles.textStyle}>{l.fatalDisease}</Text>
          </Col>
        </Row>
      ))}
    </Grid>
  );
};
const renderColum = (colNum = 1, list = []) => {
  if (list.length > 0) {
    if (colNum === 1) {
      return renderOneColumn(list);
    } else if (colNum === 2) {
      return renderTwoColumn(list);
    } else if (colNum === 3) {
      return renderThreeColumn(list);
    }
  }
};
const FileDetail = ({navigation}) => {
  const componentCode = navigation.getParam('componentCode');
  const componentFile = navigation
    .getParam('componentFile')
    .filter(f => f.componentCode === componentCode);
  const colNum = componentFile.length > 0 ? componentFile[0].colNum : 0;
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Card containerStyle={styles.containerStyle}>
        <ScrollView
          style={styles.srollviewStyle}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.textNoteStyle}>
            Ghi chú: +: bắt buộc; +/-: Nếu có
          </Text>
          {renderColum(colNum, componentFile)}
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    // marginBottom: 15,
  },
  textNoteStyle: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  gridStyle: {
    marginBottom: 15,
  },

  textHeaderCol1Style: {fontWeight: 'bold'},
  col1Style: {
    marginRight: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  colStyle: {
    justifyContent: 'center',
  },
  textHeaderColStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  srollviewStyle: {
    // marginTop: 0,
  },
});

FileDetail.navigationOptions = {
  title: 'Chi tiết Hồ sơ',
  headerStyle: {
    backgroundColor: '#c0972e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignSelf: 'center',
  },
};
export default FileDetail;
