
import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Citywise from "./Citywise"; 


const WeatherSearch = ({ fetchWeatherData }) => {
    const [cityname, setcityname] = useState("");
    const navigation = useNavigation();
    const handleSearch = () => {
        if (cityname.trim() !== "") {
            fetchWeatherData(cityname);
            setcityname("");
            navigation.navigate("Home");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.Text_box}>
                <TextInput style={styles.input} placeholder="Enter city name" value={cityname} onChangeText={(Text) => setcityname(Text)} />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                  <Icon name="magnify" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <Citywise/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#edebe6",
    },
    Text_box: {
        flexDirection: "row",
        marginLeft: 5,
        marginRight: 5,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 5,
        padding: 10,
        marginTop: 50,
    },
    searchButton: {
        padding: 10,
        marginTop: 50,
        backgroundColor: "#050866",
        borderRadius: 5,
        height: 40,
    },
});
export default WeatherSearch;
