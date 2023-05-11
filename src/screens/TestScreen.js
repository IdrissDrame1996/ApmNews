import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', title: 'Article 1' },
  { id: '2', title: 'Article 2' },
  { id: '3', title: 'Article 3' },
  { id: '4', title: 'Article 4' },
  { id: '5', title: 'Article 5' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    width: 150,
    height: 150,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default App;