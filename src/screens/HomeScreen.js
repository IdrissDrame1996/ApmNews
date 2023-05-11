import React, {useContext, useEffect ,useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {Button,  SafeAreaView,FlatList, StyleSheet,Text, View,Dimensions,Image, RefreshControl, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';



import Article from '../components/Articles';

import { SearchContext } from '../context/SearchContext';








const HomeScreen = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const {resultSearch, setSearch,isLoadingSearch} = useContext(SearchContext);
  const {getNews} = useContext(SearchContext);
  const { categoryText, keywordText} = useContext(SearchContext);
  const {count,incrementByFifteen} = useContext(SearchContext);
 
  
  

   


  const [refreshing, setRefreshing] = React.useState(false);
  const renderFooter = () => {
    return (
      <View >

        <Button title="Plus de dépêches" onPress={() => { incrementByFifteen();    getNews(userInfo.user_token,categoryText,keywordText,incrementByFifteen());  }}  />
      </View>
    );
  };

  

  useEffect(() => {
   
    getNews(userInfo.user_token,categoryText,keywordText,count);
},[]);




const onRefresh = useCallback(() => {
  setRefreshing(true);
 
  getNews(userInfo.user_token,categoryText,keywordText,count);

 setRefreshing(false);


 

}, );

const resultSearchArticles = resultSearch ;






return(
 
    <SafeAreaView style={styles.container}>


  
 

    

        <FlatList
            data= {(resultSearch)  }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem = {({item}) =>
                <Article
                
                  tag_color = {item.tags ? (item.tags[0].tag_color) : ("")}
                  tag_name = {item.tags ? (item.tags[0].tag_name) : ("")}
                  tag_color2 = {item.tags && item.tags.length > 1 ? (item.tags[1].tag_color) : ("")}
                  tag_name2 = {item.tags && item.tags.length > 1? (item.tags[1].tag_name) : ("")}
                    id = {item.id}
                    title = {item.title}
                    
                    publishedAt = {item.date}               
                  
                    
                />}
              
            keyExtractor = {(item) => item.title}
          ListFooterComponent={renderFooter}
          
        />
         
 <Spinner visible={isLoadingSearch} />


 
    </SafeAreaView>
  

  
   
)



  /*
  return (
    

    <View style={styles.container}>     
       
            
      <Spinner visible={isLoading} />
    <Text>BIENVENUE DANS L'APPLI APM</Text>
   
    </View>
  );*/
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default HomeScreen;
