import React,{useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';


const Text1 = () => {
    const [state, setstate] = useState <any>([]);
  
    const text=()=>{
    
        return( 
          
            <TextInput placeholder='hello' style={{backgroundColor:'orange',margin:20}}/>
           
    )
        }


   console.log(state)
   
  return (
    <View style={{flex:1}}>
          <TouchableOpacity onPress={()=>{setstate([...state,text()])}}>
      <Text style={{alignSelf:"center",fontSize:29}}> Add</Text>
      </TouchableOpacity>
      <ScrollView>
        {state}
        </ScrollView>
      
       <View style={{flex:1}}>
   
      </View>

    </View>
  );
}

export default Text1;


