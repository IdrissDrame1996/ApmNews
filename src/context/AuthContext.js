import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);



  const loginA= (login, password) => {
    setIsLoading(true);

    axios({
      method: 'post',
      url: 'https://app.apmnews.com/1.0/auth.php',
      params: {
        login: login,
        password: password
      }
    })  
      
      .then(res => {
    

        let userInfo = res.data;
        console.log(userInfo.user_to);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        alert ("Bon déroulé")
      })
      .catch(e => {
     
        console.log(`login error ${e}`);
        setIsLoading(false);
        alert (e)
      });
  };

  const logout = () => {
    setIsLoading(true);
console.log("test")
    axios
      .post(
        `https://app.apmnews.com/logout.php`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.user_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,

        loginA,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
