import React from "react";
import {View,TouchableOpacity,Pressable,StyleSheet,Text,Button ,Image, useWindowDimensions,ScrollView } from "react-native";
import { StackActions } from '@react-navigation/native';

import UnixDateToFormattedText from "./UnixDateToFormattedText";


   
import { useNavigation } from '@react-navigation/native';

import HTML from 'react-native-render-html';
import { Badge } from "react-native-elements";





const SingleArticle = (props) => {

    const navigation = useNavigation();
    const {width} = useWindowDimensions();




    

    const renderersProps = {
        
        a: {
          onPress: (event, href, htmlAttribs) => {
            event.preventDefault();
            const pattern = /id=([^&]+)/;
            const match = href.match(pattern);
            const myId = match ? match[1] : null;
            const pushAction = StackActions.push("ArticlesScreen", {myId});
           
           // const pushAction = StackActions.push("APMNEWS");

            
            navigation.dispatch(pushAction);
            //navigation.push('ArticlesScreen', {myId});
            console.log(myId)
   
          },
        },
      };

  

    return(

       
         

          

            <View style={{padding: 5}}>
 
            <ScrollView>
        {/*    title */}
        <View style={styles.badge}>
                { (props.tag_name !== "") && <Badge style ={styles.singleBadge}  value={props.tag_name} badgeStyle={{backgroundColor: props.tag_color} }></Badge> 
                }
                 { (props.tag_name2 !== "") && <Badge  style ={styles.singleBadge}  value={props.tag_name2} badgeStyle={{backgroundColor: props.tag_color2} }></Badge> 
                }
                </View>
            <Text style={styles.title}>{props.title}</Text>
            <View style={{marginTop : 10, marginBottom:10}}>
                <UnixDateToFormattedText style={styles.date} unixDate={props.publishedAt} />
                </View>

           
      <HTML source={{ html: props.description }}  contentWidth={width} renderersProps={renderersProps} />
      <View style={{ padding: 20 }}>
     
    </View>
            </ScrollView>

            <View style={styles.data}>           
                
                
            </View>


   
    
 
          
            </View>
      

        
    )
}

export default SingleArticle;

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
        marginTop: 0
    },
    singleBadge : {
        margin:15
    },
    badge:{
        flexDirection: 'row',
    },
    title:{
        fontSize: 20,
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


const useStyle = () => {
    const dimensions = useWindowDimensions();
    console.log('Logging dimensions', dimensions)

    const styles = StyleSheet.create({
      container: {
        height: dimensions.height,
        width: dimensions.width,
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
  
    return { styles }
}
