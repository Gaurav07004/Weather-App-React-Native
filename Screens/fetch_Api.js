import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";

import WeatherSearch from "./Search"; 
import CurrentWeather from "./Current";
import WeatherInfo from "./Home";

const Tab = createMaterialBottomTabNavigator();
const API_KEY = "d1073f45be864c549e085206231706";

const Down_Tab = () => {
    const [WeatherData, setWeatherData] = useState(null);
    const [Loaded, setLoaded] = useState(false);

    const fetchWeatherData = async (cityname) => {
        try {
            setLoaded(false);
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityname}&days=7&aqi=no&alerts=yes&units=metric`);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    useEffect(() => {
        fetchWeatherData("Mumbai");
    }, []);

    if (!WeatherData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Tab.Navigator barStyle={{ height: 65 }}>
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={"#050866"} size={28} />,
                }}
            >
                {() => <WeatherInfo WeatherData={WeatherData}/>}
            </Tab.Screen>
            <Tab.Screen
                name="Citywise"
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="map-search-outline" color={"#050866"} size={25} />,
                }}
            >
                {() => <WeatherSearch fetchWeatherData={fetchWeatherData} />}
            </Tab.Screen>
            <Tab.Screen
                name="Current"
                component={CurrentWeather}
                options={{
                    tabBarIcon: ({ color, size }) => <Icon name="map-marker-multiple-outline" color={"#050866"} size={28} />,
                }}
            />
        </Tab.Navigator>
    );
};

const Down_Tab_Execute = () => {
    return (
        <NavigationContainer>
            <Down_Tab />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Down_Tab_Execute;
