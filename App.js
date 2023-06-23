import { StyleSheet, View } from "react-native";
import Weather from "./Screens/fetch_Api";

export default function App(){
    return(
      <View style={styles.container}>
        <Weather/>
      </View>
    )
};

const styles =StyleSheet.create({
  container: {
    flex:1,
  }
});
