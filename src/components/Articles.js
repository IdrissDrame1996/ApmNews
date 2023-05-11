import React from "react";
import {View,Pressable,StyleSheet,Text} from "react-native";
import { Badge } from "react-native-elements";



import UnixDateToFormattedText from "./UnixDateToFormattedText";


   
import { useNavigation } from '@react-navigation/native';





const Article = (props) => {
    const navigation = useNavigation();

    const handlePress = (id) => {

        const myId = id;
        console.log(myId)
     navigation.navigate('ArticlesScreen', {myId: myId});
     navigation.setOptions({headerShown: false});
      
      
    }
 
    return(

        
        <Pressable style={styles.container}   onPress={() =>{ handlePress(props.id)}}   >
            {/* image */}
        
  
 

            <View style={{padding: 10}}>
                <View style={styles.badge}>
                { (props.tag_name !== "") && <Badge style ={styles.singleBadge}  value={props.tag_name} badgeStyle={{backgroundColor: props.tag_color} }></Badge> 
                }
                 { (props.tag_name2 !== "") && <Badge  style ={styles.singleBadge}  value={props.tag_name2} badgeStyle={{backgroundColor: props.tag_color2} }></Badge> 
                }
                </View>

        {/*    title */}
            <Text style={styles.title}>{props.title}</Text>


            <View style={styles.data}>           
                
                <View>
                <UnixDateToFormattedText style={styles.date} unixDate={props.publishedAt} />
                </View>
            </View>
       

   
    
 
          
            </View>
        </Pressable>

        
    )
}

export default Article;

const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignSelf: "center",
        borderRadius: 10,
        shadowOpacity: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            height: 5,
            width: 5
        },
       
        backgroundColor: "#fff",
        marginTop: 5,
    },
    badge:{
        flexDirection: 'row',
    },
    singleBadge : {
        margin :15,
    },
    title:{
        fontSize: 15,
        fontWeight: 'bold',
        
        marginTop: 10
    },
    description:{
        fontSize: 16,
        fontWeight: "400",
        marginTop: 10
    },
    data:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    heading:{

    },
    author:{
        fontWeight: "bold",
        fontSize: 15
    },
    date:{
        fontWeight: "bold",
        color: "#grey",
        fontSize: 10
    }
   
})