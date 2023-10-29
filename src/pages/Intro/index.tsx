import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Intro({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>OPA</Text>
      <Button title='Teste' onPress={() => navigation.replace('Home')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
