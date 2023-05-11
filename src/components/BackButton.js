import React from 'react';
import { Button,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Button
      title="Retour" style={styles.backButton}
      onPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
    
    backButton: {
      position: 'absolute',
      left: 1,
    },
  });

export default BackButton;