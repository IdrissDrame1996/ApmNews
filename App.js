import 'react-native-gesture-handler';
import React, { Component, useState, useContext } from 'react';
import { Platform,Image, Button, StatusBar,StyleSheet, Text, View, SafeAreaView,Dimensions, ScrollView, TouchableOpacity,TextInput } from 'react-native';
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

import { DrawerActions, NavigationContainer} from '@react-navigation/native';
import { AuthContext } from './src/context/AuthContext';
import {AuthProvider} from './src/context/AuthContext';
import { SearchContext } from './src/context/SearchContext';
import { SearchProvider } from './src/context/SearchContext';
import {Icon} from 'react-native-vector-icons';


import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';

import ArticlesScreen from './src/screens/ArticlesScreen';
import { createStackNavigator } from '@react-navigation/stack';

import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from '@react-navigation/native';




function MyStackNavigator() {

  const {userInfo} = useContext(AuthContext);

  const { getNews} = useContext(SearchContext);
const navigation = useNavigation();

  
const handleDrawerOpen = () => {
  navigation.openDrawer();
};
  const [text, setText] = useState('');
  const handleKeyPress = (e) => {
    console.log(e.nativeEvent.key)
    
    if (e.nativeEvent.key === '') {
      console.log('Enter key pressed!');
      // do something with the text input value
    }
  };
  return (
    <Stack.Navigator  >
      <Stack.Screen name="APMNEWS" options={{
            headerLeft: () => 
            (
              <TouchableOpacity   onPress={handleDrawerOpen}  >
              <Image  source={require('./src/Hamburger_icon.svg.png')}
              style={[styles.headerImageH]} onPress={handleDrawerOpen}  />
              </TouchableOpacity>
            ),
            headerTitle : props => (
              <View style={styles.headerImage}> 
         
              <Image
                source={require('./src/apmnews.png')}
                style={[styles.headerImage]}
              />
        
                 
                 </View>


            ),
        
            
            
            headerRight: () => (
             
      <SearchBar
      value={text}
      placeholder="Rechercher "
      onChangeText={(newText) => setText(newText)}
      onKeyPress={handleKeyPress}
      onSubmitEditing={() => {
        getNews(userInfo.user_token, "", text,15);
      }}
      onPressCancel={() => {
        this.filterList("");
      }}
      onPress={() => getNews(userInfo.user_token, "", text,15)}
      />



            ),
           
        headerShown: true,
            drawerItemStyle: { height: 0 },
            
           
          }}  component={HomeScreen} />

      <Stack.Screen name="ArticlesScreen" options={{ headerTransparent: false, headerTitle:"", headerStyle:{backgroundColor: "#f2f2f2"} }}    component={ArticlesScreen} />
   
 
    </Stack.Navigator>
  );
}




function CustomDrawerContent(props) {
 
  const {userInfo,logout} = useContext(AuthContext);
  const { getNews} = useContext(SearchContext);

  

  const [active, setActive] = useState('Home');


 
  const activeStyle = {
    backgroundColor: 'grey',
    color:"blue", // Personnalisation de la couleur de fond
    // Personnalisation de la police
  };

  const lescategories = userInfo.categories;

  const handlePress = (screenName) => {
    setActive(screenName);

  };

  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
      {!!userInfo.user_token && <DrawerItem  active={active === 'Home'} options ={{drawerActiveTintColor : 'red'}} onPress={() => { getNews(userInfo.user_token, "", "",15); handlePress("Home"); props.navigation.dispatch(DrawerActions.closeDrawer())  }}  style={active === 'Home' ? activeStyle : null} label="Sommaire"/>}
     
      {!!userInfo.user_token && lescategories.map((item)=>(<DrawerItem active={active === item.id} key={item.id} onPress={() => { getNews(userInfo.user_token, item.id, "",15); setActive(item.id); props.navigation.dispatch(DrawerActions.closeDrawer()) }}  style={active === item.id ? activeStyle : null} label={item.label}/>))}
      <DrawerItem label="Déconnexion" color="red"  onPress={() => { logout(); props.navigation.dispatch(DrawerActions.closeDrawer()) }}  />
  

      


    </DrawerContentScrollView>
  );
}

const Stack = createStackNavigator();

function MyDrawer() {
  const {userInfo, isLoading, splashLoading} = useContext(AuthContext);

  const { getNews} = useContext(SearchContext);
  

  const [text, setText] = useState('');
  const handleKeyPress = (e) => {
    console.log(e.nativeEvent.key)
    
    if (e.nativeEvent.key === '') {
      console.log('Enter key pressed!');
      // do something with the text input value
    }
  };

  return ( 

    
<Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>
        {splashLoading ? (
          <Drawer.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.user_token ? ( 
          <Drawer.Screen name="APMNEWS"    options={{
            
            headerTitle : props => (
              <View style={styles.headerImage}> 
              <Image
                source={require('./src/apmnews.png')}
                style={[styles.headerImage]}
              />
        
                 
                 </View>


            ),
        
            
            
            headerRight: () => (
             
      <SearchBar
      value={text}
      placeholder="Rechercher "
      onChangeText={(newText) => setText(newText)}
      onKeyPress={handleKeyPress}
      onSubmitEditing={() => {
        getNews(userInfo.user_token, "", text,15);
      }}
      onPressCancel={() => {
        this.filterList("");
      }}
      onPress={() => getNews(userInfo.user_token, "", text,15)}
      />



            ),
           
            headerShown: false,
        
            drawerItemStyle: { height: 0 },
            
           
          }}  component={MyStackNavigator}  />
     
 

    )  
           

         
         : (
          <>
            <Drawer.Screen
              name="Login"
              component={LoginScreen} 
              options={{headerShown: false}}
            />

            <Drawer.Screen
              name="ArticlesScreen"
              component={ArticlesScreen} 
              options={{headerShown: false}}
            />
        
            
          </>
        )

        
        
        }
        
     
            
         
        
        

     
      
    </Drawer.Navigator>
    
    
  );
  
}


const Drawer = createDrawerNavigator();








  const App = () => {
    return (
 
      <NavigationContainer>
           
      <AuthProvider>
   
        <SearchProvider>
        <StatusBar backgroundColor="#06bcee" />    
    
          <MyDrawer/>
   


    
     
        </SearchProvider>
      
      </AuthProvider>
      
        </NavigationContainer>
      
    );
   
  } ;

  const styles = StyleSheet.create({
    headerImage: {
      flex: 1,
      width: 110,
      height: 10,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerImageH: {
      flex: 1,
      width: 40,
      height: 20,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'center',
   
    },
    view: {
      margin: 1
    },
      
  });
  
export default App;
