/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';

import Res from '../../Color/color';
import ImagePicker from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import {Card, Modal, TouchableRipple} from 'react-native-paper';
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';
import background from '../../../assets/images/abstract.png';
import PropTypes from 'prop-types';

import backgroundC from '../../../assets/images/abstract2.png';
import back from '../../../assets/images/back.png';
import circle from '../../../assets/images/circaleBack.png';
import style from '../Home/Style/style';
import {FlatList} from 'react-native-gesture-handler';
import Fixed from '../FixeTest/FixeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Recorder from '../../components/recorderPlayer';
import Player from '../../components/Player';
import FixAction from '../../action/FixAction';
import DATA from '../../model/Data';
import Toast from 'react-native-simple-toast';
import Dropdown from '../../components/drop';
import {UserData} from '../../model/userData';
let screenWidth = Dimensions.get('window').width;
class PopUpReserve extends React.Component {
  state = {
    isModalVisible: false,
    isModalPlayer: false,
    voice: '',
    answerText: '',
    SumSbjId: 0,
    questionId: '',
    teacherId: '',
    SumObjId: 0,
    voiceFileName: 'test',
    imageFileName: 'test',
    textButton:'رزرو کردن',
    flagButton:0
  };
  componentDidMount() {

    let {dataPro} = this.props;

    this.setState({
      questionId: dataPro.Id,
    });
  }
  _requestQuestion = e => {

      if (this.props.isConnected) {
    let {
      answerText,
      SumSbjId,
      questionId,
      teacherId,
      SumObjId,
      voiceFileName,
      imageFileName,
    } = this.state;
   
      FixAction._onPostSaveReserved(
          UserData.jsonData.teacherInfo.Rid,
          questionId,
        ).then(res => {
          // this._onGetData();
          this.setState({
            flagButton:1,
            textButton:"ثبت پاسخ"
          })
        });
        // this._onGetData();
   
    
} else {
  Toast.show('اینترنت خود را برسی کنید');
}

  };
  _openScreen() {
    let {navigation} = this.props;
    navigation.navigate('Home');
  }
  _ShowModalPlyer = e => {
    if (e.length > 10) {
      var voice = [
        {
          title: 'Stressed Out',
          artist: 'Twenty One Pilots',
          albumArtUrl:
            'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
          audioUrl: e,
        },
      ];
      this.setState({
        voice: voice,
        isModalPlayer: !this.state.isModalPlayer,
      });
    } else {
      Toast.show('فایل برای گوش دادن وجود ندارد');
    }
  };
  _hideModalPlyer = () => {
    this.setState({
      isModalPlayer: !this.state.isModalPlayer,
    });
  };
  _hideModalMenu = () => {
 
    this.props.changeState(false);
  };
  onShowImage = e => {
    if (this.props.isConnected) {
    console.log('onShowImage', e);
    if (e.length > 10) {
      this.props.openModalImageFull(e);
    } else {
      Toast.show('فایل برای نمایش دادن وجود ندارد');
    }
  } else {
    Toast.show('اینترنت خود را برسی کنید');
  }
  };
  onShowText = e => {
    this.props.openModalTextFull(e);
  };
  onImagePicker = () => {
    const options = {
      title: 'فایل را انخاب کنید',
      takePhotoButtonTitle: 'عکس گرفتن',
      chooseFromLibraryButtonTitle: 'انتخاب از گالری',
      cancelButtonTitle: 'لغو',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('Response = ', source);
        DATA.file.image = response;
      }
    });
  };
  onRecord = e => {
    this.setState({
      isModalVisible: true,
    });
  };
  _hideTabBar = e => {
    this.setState({
      isModalVisible: false,
    });
  };
  _filterSort(data, indext) {
    return data.SbjName;
  }
  filterSort(data, indext) {
    return data.SbjName;
  }
  _filterName(data, indext) {
    return data;
  }
  _filterSortCourse(data, indext) {
    return data.ObjName;
  }
  _filterNameCourse(data, indext) {
    return data;
  }
  _selectCourse = data => {
    console.log(data.CrsId + '++' + this.state.groupId);

    return data;
  };
  _selectGroups = data => {
    if (this.props.isConnected) {
    this.props.onFunObject(data.subjectId);
    this.setState({
      groupId: data.groupCode,
    });
  } else {
    Toast.show('اینترنت خود را برسی کنید');
  }
    return data;
  };

  render() {
    let {
      textTitlePopUp,
      datePopUp,
      viewItem,
      viewCircleII,
      circleTitle,
      detail,
      buttonItem,
      textButton,
      viewItemRow,
      viewItemRowIcon,
      viewItemRowIII,
      viewDetail,
      imageCard,
    } = style;
    let {dataPro} = this.props;
    
    return (
      <View
      style={{
        height: '100%',
        width: '100%',

        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        padding: 15,
      }}>
                      <Text style={{height:`100%`,width:`100%`,position:'absolute'}} onPress={()=>this._hideModalMenu()}/>

     
      <Card
        style={{
          height: 400,
          width: '100%',
          borderRadius: 15,
          padding: 8,
          marginTop: 8,
          alignItems: 'center',
        }}>
        <View style={[viewItem,{ width: '100%',}]}>
        <TouchableRipple
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',

            position: 'absolute',
            top: 0,
            alignSelf: 'center',
          }}
          onPress={() => {
            this._hideModalMenu();
          }}>
          <View
            style={{
              width: 50,
              height: 4,
              borderRadius: 8,
              backgroundColor: Res.Color.grayLight,
            }}
          />
        </TouchableRipple>
        
        <View style={viewItemRow}>
        <View style={{flexDirection:'row',height:50,width:`100%`,alignItems:'center'}}>
        <Text allowFontScaling={false} style={[textTitlePopUp, {fontSize: 20}]}>
            {dataPro.CrsName}
          </Text>
          <Text allowFontScaling={false} style={[datePopUp,{left:0,position:'absolute',top:12,fontSize:14}]}>{dataPro.questionType}</Text>
        </View>
        <Text allowFontScaling={false} style={[datePopUp,{top:0,position:'absolute',fontSize: 11,    fontFamily: 'BYekan' }]}>
        {dataPro.persianDate.substring(0, 10)}
            </Text>
          {/* <View style={{top:7,height:60}}>
          <Text style={[datePopUp,{top:0,position:'absolute',fontSize: 11,}]}>
              {dataPro.persianDate.substring(0, 10)}
            </Text>
           
          
          </View> */}
        </View>

       
       
          <View
            style={[
              viewItemRow,
              {justifyContent: 'space-between', marginTop: 12, width: '100%',},
            ]}>
            <TouchableRipple
              style={{width: '50%', height: 50}}
              onPress={()=>this._ShowModalPlyer(dataPro.ProblemVoicePath)}>
              <View
                style={[
                  buttonItem,
                  {width: '100%', height: 50, marginTop: 0,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:12,paddingRight:12},
                ]}>
                            <Icon name="play" size={28} color={dataPro.ProblemVoicePath.length>15?Res.Color.primersButton:Res.Color.grayLight} />

                
                  <Text style={textButton}>{'پخش صدا'}</Text>
               
              </View>
            </TouchableRipple>
            <View style={{width: 10}} />
            <TouchableRipple
              style={{width: '50%', height: 50}}
              onPress={()=>this.onShowImage(dataPro.ProblemImagePath)}>
              <View
                style={[
                  buttonItem,
                  {width: '100%', height: 50, marginTop: 0,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:12,paddingRight:12},
                ]}>
                            <Icon name="file-photo-o" size={28} color={dataPro.ProblemVoicePath.length>15?Res.Color.primersButton:Res.Color.grayLight} />

                
                  <Text style={textButton}>{'مشاهده عکس'}</Text>
               
              </View>
            </TouchableRipple>
          </View>
       

     
          <View
           style={{
              
              height: '50%',
              marginTop:10,
             
              borderRadius: 10,
            
            
            }}>
          <View
            style={{
              width: `100%`,
              height: '100%',
              marginTop:10,
             
              borderRadius: 10,
              padding:8,
            
              backgroundColor: Res.Color.grayLight,
            }}>
             {dataPro.ProblemText.split(/\r\n|\r|\n/).length>5||dataPro.ProblemText.length>400?
          <View>
          <Text allowFontScaling={false} style={[datePopUp, {fontSize: 13,}]}  numberOfLines={7}>
            {dataPro.ProblemText}
          </Text>
          <Text  allowFontScaling={false} onPress={() => this.onShowText(dataPro.ProblemText)}style={[datePopUp, {fontSize: 13,color:Res.Color.primersButton}]} >
            {"نمایش بیشتر"}
          </Text>
          </View>  
          : <Text style={[datePopUp, {fontSize: 13,}]} >
            {dataPro.ProblemText}
          </Text>}
          </View>
          </View>
        
          <View
            style={[
              viewItemRow,
              {
             
                marginTop:15,
                width: '100%',
               
              
                
               
              },
            ]}>
            <TouchableRipple
                style={{width: '50%', height: 50}}
                onPress={()=>this.props.openModalPopUpQ()}>
                <View style={[buttonItem, {width: '100%', height: 50}]}>
                  <Text style={textButton}>{"پاسخ می دهم"}</Text>
                </View>
              </TouchableRipple>

            <View style={{width: 10}} />

            <TouchableRipple
                style={{width: '50%', height: 50}}
                onPress={this._requestQuestion}>
                <View style={[buttonItem, {width: '100%', height: 50}]}>
                  <Text style={textButton}>{"رزرو کردن "}</Text>
                </View>
              </TouchableRipple>
          </View>
        </View>

        <Modal
          style={{position: 'absolute', bottom: 0}}
          visible={this.state.isModalVisible}
          onDismiss={this._hideTabBar}>
          <View style={{width: '100%', height: '100%'}}>
            <Recorder hideRecorded={this._hideTabBar} />
          </View>
        </Modal>

        <Modal
          style={{position: 'absolute', bottom: 0}}
          visible={this.state.isModalPlayer}
          onDismiss={this._hideModalPlyer}>
          <Player tracks={this.state.voice} />
        </Modal>
      </Card>
      <TouchableOpacity
      activeOpacity={0.9}
        style={{
          width: 100,
          height: 260,
        

          position: 'absolute',
          top: 0,
          alignSelf: 'center',
        }}
        onPress={() => {
          this._hideModalMenu();
        }}
      />
    </View>
    );
  }
  static propsType = {
    changeState: PropTypes.func,
    dataPro: PropTypes.any,
    navigation: PropTypes.any,
    openModalTextFull: PropTypes.any,
    openModalImageFull: PropTypes.any,
    hidePopUp: PropTypes.any,
    object: PropTypes.array,
    subject: PropTypes.array,
    onFunObject: PropTypes.func,
    isConnected: PropTypes.any,
    openModalPopUpQ: PropTypes.any,
  };
}

export default PopUpReserve;
