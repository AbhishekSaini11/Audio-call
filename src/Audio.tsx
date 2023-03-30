import React, {useRef, useState, useEffect,useCallback} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';
// import './shim.js'
import {
ClientRoleType,
createAgoraRtcEngine,
IRtcEngine,
ChannelProfileType,
} from 'react-native-agora';
const appId = '91fe1b811446478ab1348b9c47f203d2';
const channelName = 'test';
const token = '007eJxTYGAs3KDbUhXQeMM8jdX6d97dv/dWS5e85nI4/oS1dmsTf4QCg6VhWqphkoWhoYmJmYm5RWKSobGJRZJlsol5mpGBcYoRyxPllIZARobpi60ZGKEQxGdhKEktLmFgAAD3YR3v';
const uid = 0;



const Audio = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); 
  const [isJoined, setIsJoined] = useState(false); 
  const [remoteUid, setRemoteUid] = useState(0);
  const [message, setMessage] = useState(''); 
  const [isSpeakerEnable, setIsSpeakerEnable] = useState(true);
  useEffect(() => {
 

    setupVoiceSDKEngine();
 });
 
 const setupVoiceSDKEngine = async () => {
    try {
      // console.log("h1");
      
    // use the helper function to get permissions
    
    if (Platform.OS === 'android') { await getPermission()};
    agoraEngineRef.current =createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;
    
    agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
    agoraEngine.initialize({    
        appId: appId,
    });
    } catch (e) {
        console.log(e);
    }
 };
 const join = async () => {
  if (isJoined) {
    console.log("joined");
    
      return;
  }
  try {
    console.log("joining");
    // console.log(setupVoiceSDKEngine())
      agoraEngineRef.current?.setChannelProfile(
          ChannelProfileType.ChannelProfileCommunication,
      );
      console.log(agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    }));
       console.log(remoteUid);
       
      // console.log("JOIN");
      
  } catch (e) {
      console.log(e);
  }
};
const leave = () => {
  try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
  } catch (e) {
      console.log(e);
  }
};
const Speeker=()=>{
    try{
        agoraEngineRef.current?.setEnableSpeakerphone(!isSpeakerEnable)
        setIsSpeakerEnable(!isSpeakerEnable);
        console.log("hello")
    }
    catch (e) {
        console.log(e);
    }
}

    const getPermission = async () => {
      if (Platform.OS === 'android') {
          await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
      }
  };
    function showMessage(msg: string) {
        setMessage(msg);
    }
    return (
      <SafeAreaView style={styles.main}>
        <Text style={styles.head}>Make a call</Text>
        <View style={styles.btnContainer}>
          <Text onPress={join} style={{...styles.button,backgroundColor:'green'}}>
            Start CAll
          </Text>
          <Text onPress={leave} style={styles.button}>
            End CAll
          </Text>
         
        </View>
        <Text onPress={Speeker} style={styles.button}>
            Sppeker
          </Text>
        {/* <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          {isJoined ? (
            <Text>Local user uid: {uid}</Text>
          ) : (
            <Text>Join a channel</Text>
          )}
          {isJoined && remoteUid !== 0 ? (
            <Text>Remote user uid: {remoteUid}</Text>
          ) : (
            <Text>Waiting for a remote user to join</Text>
          )}
          <Text>{message}</Text>
        </ScrollView> */}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 25,
        paddingVertical:16,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: 'red',
        margin: 5,
    borderRadius:10,
    marginHorizontal:40
    },
    main: {
        flex: 1, 
        alignItems: 'center'
    ,
    justifyContent:'center'
},
    scroll: {
        flex: 1, 
        backgroundColor: '#ddeeff',
         width: '100%'
        },
    scrollContainer: {
        alignItems: 'center'
    },
    videoView: {
        width: '90%',
         height: 200
        },
    btnContainer: 
    {flexDirection: 'row', 
    justifyContent: 'center'
},
    head: 
    {
        fontSize: 50,
        bottom:100,
        color:"red"
    },
});

export default Audio;