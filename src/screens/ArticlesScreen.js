import React, {useContext, useEffect ,useState} from 'react';
import { Component } from 'react';
import {Button,  SafeAreaView,FlatList, StyleSheet,Text, View, ScrollView,Dimensions,Image, useWindowDimensions} from 'react-native';
import { Header } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { Icon } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Article from '../components/Articles';
import axios from "axios";
import { SearchContext } from '../context/SearchContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingleArticle from '../components/SingleArticle';
import BackButton from '../components/BackButton';
import { useRoute } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const ArticlesScreen = ({route, navigation}) => {


    const {myId} = route.params;  
    console.log(myId)
   
   

 
  const {userInfo} = useContext(AuthContext);
  const {isLoadingSearch} = useContext(SearchContext)
  const [singleArticle,setSingleArticles] = useState([]);


  



  const getSingleArticle = () => {


    
      axios.get('https://app.apmnews.com/1.0/link.php',{
          params:{
            user_token : userInfo.user_token,
            
            article_id : myId,
            
          
            deviceId : "IDDevice123456789",
            _ : "1682543166278"

          }
      })
          .then( (response) =>{
              // handle success
              let singleArticle = response.data;
              setSingleArticles(singleArticle);
              console.log(singleArticle.article_url)
     
              

           
             
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .then(function () {
              // always executed
          });
  }
 

  useEffect(() => {
    if (myId)
    {
   
    getSingleArticle();
    }
},[myId]);




 
  const result = singleArticle;

 
 





return(
 
 
    <SafeAreaView style={styles.container}>

  
            

            
         
            <SingleArticle
            
                tag_color = {singleArticle.tags ? (singleArticle.tags[0].tag_color) : ("")}
                tag_name = {singleArticle.tags ? (singleArticle.tags[0].tag_name) : ("")}
                tag_color2 = {singleArticle.tags && singleArticle.tags.length > 1 ? (singleArticle.tags[1].tag_color) : ("")}
                tag_name2 = {singleArticle.tags && singleArticle.tags.length > 1? (singleArticle.tags[1].tag_name) : ("")}

                    title = {singleArticle.title}
                    description =  {singleArticle.body}                    
                    publishedAt = {singleArticle.date}  
                  
                    
                />

       
 <Spinner visible={isLoadingSearch} />
    </SafeAreaView>
   
   
)





};

const styles =  StyleSheet.create({
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
  },
 
  
  wrapper: {
    width: '100%',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default ArticlesScreen;
