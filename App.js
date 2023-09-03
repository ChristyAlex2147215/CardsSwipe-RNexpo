import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MatchSwipe from "./src/screens/MatchSwipe"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {/* <TinderSwipe/> */}
      <MatchSwipe/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    marginLeft:0
  },
});
