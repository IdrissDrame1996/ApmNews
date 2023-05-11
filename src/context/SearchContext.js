import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

import {BASE_URL} from '../config';

export const SearchContext = createContext();


export const SearchProvider = ({children}) => {

  
  const [resultSearch, setSearch] = useState({});
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [categoryText, setCategory] = useState(null);

  const [keywordText, setKeyword] = useState(null);
  
  const [count, setCount] = useState(15);
 

        
    const incrementByFifteen = () => {
      const newStart = count + 15;
      console.log(newStart + " DFS")
   
      return newStart
    };
  

  const getNews = (usertoken,category, keyword, nbdeLignes) => {
  

   

  
    
    let categoryText = category;
    let keywordText = keyword;
    let count = nbdeLignes;
    setCount(count);
    setCategory(category);
    setKeyword(keyword);

    console.log(keywordText +  " Keyword TEXT")
    console.log(count +  " Count")


    AsyncStorage.setItem('categoryText', JSON.stringify(category));
    AsyncStorage.setItem('keywordText', JSON.stringify(keyword));
    AsyncStorage.setItem('count', JSON.stringify(count));



 
    setIsLoadingSearch(true);



    
      axios.get('https://app.apmnews.com/1.0/search.php',{
          params:{
            user_token : usertoken,
            category: categoryText,
            keyword : keywordText,
            page_number : "1",
            results_per_page : count,
            deviceId : "IDDevice123456789",
            _ : "1682543166278"

          }
      })
          .then( (response) =>{
              // handle success

              let resultSearch = response.data.articles;
          
              console.log("BON RESULTAT")

            
              setSearch(resultSearch);
              AsyncStorage.setItem('resultSearch', JSON.stringify(resultSearch));
         
              setIsLoadingSearch(false);

              setSearch(response.data.articles);
              
          })
          .catch(function (error) {
              // handle error
              console.log(error + "ERREUR");
              setIsLoadingSearch(false);
          })
          .then(function () {
              // always executed
          });
  }

  

  useEffect(() => {
    //getNews();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        isLoadingSearch,
        resultSearch, 
        categoryText,
        keywordText,  

        count,
        setCount,

        incrementByFifteen,


        getNews
       
      }}>
      {children}
    </SearchContext.Provider>
  );
};
