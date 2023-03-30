import React from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import Audio from './src/Audio';
import Text1 from './src/Text';
import Video from './src/Video';


const App = () => {
  

  return (
<View style={{flex:1}}>
  {/* <Text style={{fontSize:30}} >hello</Text> */}
  {/* <Video/> */}
<Audio/>
{/* <Text1/> */}
</View>
  );
};

export default App;
