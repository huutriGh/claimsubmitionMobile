import {Alert} from 'react-native';
import claimAPI from '../api/claimsubmition';
import {
  CLEAN_IMAGE,
  DESELECT_IMAGE,
  DISPLAY_IMAGE_AFTER_SELECT,
  SELECT_IMAGE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
} from '../constant/ActionType';
import createDataContext from './createDataContext';

const INITIAL_IMAGE = [{photos: [], type: 0}];

const getUnique = (arr, comp) => {
  const unique = arr
    .map(e => e[comp])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};
const claimImageReducer = (state, action) => {
  switch (action.type) {
    case SELECT_IMAGE:
      const type = action.payload.type;
      // ====Tim va xoa phan tu mac dinh khoi tao ban dau cua state===
      let index = state.images.findIndex(i => i.type === 0);
      if (index !== -1) {
        state.images.splice(index, 1);
      }
      //==============================================================

      //====Kiem tra hinh anh theo loai da co ton tai chua ?==========
      index = state.images.findIndex(i => i.type === type);
      if (index === -1) {
        //====Chua ton tai thi add tat ca cac hinh moi chon vao state===
        state.images.push(action.payload);
        return {...state};
      } else {
        //Nguoc lai thi tim den mang hinh theo loai, kiem tra cap nhat them cac hinh moi duoc chon vao neu chua ton tai
        //Merge hai mang photo cu va moi chon
        const newPhoto = getUnique(
          [...state.images[index].photos, ...action.payload.photos],
          'path',
        );
        // Cap nhat lai mang photo tai index bang mang photo moi
        state.images[index].photos = newPhoto;
        return {...state};
      }
    case DISPLAY_IMAGE_AFTER_SELECT:
      return {
        ...state,
      };
    case DESELECT_IMAGE:
      // console.log('images: ', state.images);
      // console.log('Actionimagestype: ', action.payload.type);
      let newImage = INITIAL_IMAGE;
      if (state.images.length > 0) {
        state.images
          .filter(p => p.type === action.payload.type)[0]
          .photos.splice(action.payload.index, 1);
        newImage = state.images;
        // console.log('newImage1: ', newImage);
        let count = newImage.filter(p => p.type === action.payload.type)[0]
          .photos.length;
        if (count === 0) {
          newImage = newImage.filter(p => p.type !== action.payload.type);
          // console.log('newImage2: ', count);
        }
      }
      // console.log('images: ', state.images);
      return {
        ...state,
        images: newImage,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        isUploading: true,
        uploadMSG: '',
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        images: [{photos: [], type: 0}],
        isUploading: false,
        uploadMSG: 'Upload thành công',
      };
    case CLEAN_IMAGE:
      return {
        ...state,
        images: [{photos: [], type: 0}],
        isUploading: false,
        uploadMSG: '',
      };
    default:
      return state;
  }
};

const selectImage = dispatch => async ({type, photos = []}) => {
  dispatch({
    type: SELECT_IMAGE,
    payload: {type, photos},
  });
};
const UploadImage = dispatch => async (
  claimId,
  imagePath = [],
  images = [],
) => {
  await dispatch({type: UPLOAD_IMAGE});
  let response = imagePath === null ? [] : imagePath;
  if (images.length > 0) {
    for (const obj of images) {
      let formData = new FormData();
      for (const photo of obj.photos) {
        const file = {
          uri: photo.path,
          name:
            photo.path.replace(/^.*[\\\/]/, '') ||
            Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
          type: photo.mime || 'image/jpeg',
        };
        formData.append('files', file);
      }
      formData.append('typeImage', obj.type);
      formData.append('claimId', claimId);

      await claimAPI
        .post('/uploadImage', formData)
        .then(res => {
          response = [...response, ...res.data];
          const keys = ['path', 'type'];
          response = [...response, ...res.data];
          response = response.filter(
            (s => o =>
              (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|')))(
              new Set(),
            ),
          );
        })
        .catch(error => {
          console.log('err:', error);
        });
    }
    if (response.length > 0) {
      await claimAPI
        .put(`/ImagePath/${claimId}`, {
          type: '0',
          path: JSON.stringify(response),
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      Alert.alert('Thông báo', 'Upload thành công');
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
      });
    }
  }
};

const displayImageAfterSelect = dispatch => async () => {
  dispatch({
    type: DISPLAY_IMAGE_AFTER_SELECT,
  });
};
const deSelectImage = dispatch => async (index, type) => {
  dispatch({
    type: DESELECT_IMAGE,
    payload: {index, type},
  });
};
const cleanImage = dispatch => async () => {
  dispatch({
    type: CLEAN_IMAGE,
  });
};

export const {Provider, Context} = createDataContext(
  claimImageReducer,
  {
    selectImage,
    displayImageAfterSelect,
    deSelectImage,
    UploadImage,
    cleanImage,
  },
  {
    images: INITIAL_IMAGE,
    isUploading: false,
    uploadMSG: '',
  },
);
