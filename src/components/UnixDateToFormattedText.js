import React from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

function UnixDateToFormattedText({ unixDate }) {
  // Créez une instance de la date avec le temps Unix en millisecondes
  const date = new Date(unixDate * 1000);

  // Utilisez les méthodes de l'objet Date pour extraire les composants de la date
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours() + 2;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Formattez les composants de la date en une chaîne de caractères dans le format souhaité
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  // Renvoyer un composant Text contenant la date formatée
  return (
    <Text style={styles.date}>Publié à {formattedDate}</Text>
  );
}


const styles = StyleSheet.create({
    
  
 
  
    date:{
        fontWeight: "bold",
        color: "#808080",
        opacity: 0.6,
        fontSize: 15
    },
   
})

export default UnixDateToFormattedText;