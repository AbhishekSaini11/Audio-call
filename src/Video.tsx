import React,{useState} from 'react';
import { Text,View } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

const Video = () => {
  const [videoCall, setVideoCall] = useState(false);
  let callBack={
    EndCall: () => setVideoCall(false)
  }
  const connectionData = {
    appId: '8fb49e027f86410fa7de85609f285855',
    channel: 'test',
    token: null, // enter your channel token as a string 
   };
   return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callBack} />
) : (
  <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
    <View style={{backgroundColor:'red',marginTop:'100%',width:'40%',alignItems:'center',height:'5%',justifyContent:'center'}}>
    <Text style={{color:'black'}} onPress={() => setVideoCall(true)}>Start Call</Text>
    </View>
    </View>
);
}

export default Video;