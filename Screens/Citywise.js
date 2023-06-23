import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const API_KEY = "d1073f45be864c549e085206231706";

const Cityweather = () => {
    const Citywise1 = () => {
        const Citylocation = "Paris";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${Citylocation}&days=7&aqi=no&alerts=yes`;
        const [cityData, setCityData] = useState(null);

        useEffect(() => {
            fetchWeatherData();
        }, []);

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (!cityData) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }


        const { location, current, forecast } = cityData;
        return (
            <View style={styles.block}>
                <View>
                    <Text style={styles.temperature}>{Math.round(current.temp_c)}°C</Text>
                </View>
                <View>
                    <Text style={styles.city}>{location.name}</Text>
                    <Text style={styles.Country}>France</Text>
                </View>
                <View style={styles.weatherData}>
                    <View>
                        <Icon style={styles.icon} name="water-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.humidity}%</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="weather-windy" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.wind_kph}km/h</Text>
                    </View>
                </View>
            </View>
        );
    };

    const Citywise2 = () => {
        const Citylocation = "Mexico City";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${Citylocation}&days=7&aqi=no&alerts=yes`;
        const [cityData, setCityData] = useState(null);

        useEffect(() => {
            fetchWeatherData();
        }, []);

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (!cityData) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }


        const { location, current, forecast } = cityData;
        return (
            <View style={styles.block}>
                <View>
                    <Text style={styles.temperature}>{Math.round(current.temp_c)}°C</Text>
                </View>
                <View>
                    <Text style={styles.city}>{location.name}</Text>
                    <Text style={styles.Country}>North America</Text>
                </View>
                <View style={styles.weatherData}>
                    <View>
                        <Icon style={styles.icon} name="water-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.humidity}%</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="weather-windy" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.wind_kph}km/h</Text>
                    </View>
                </View>
            </View>
        );
    };

    const Citywise3 = () => {
        const Citylocation = "Tokyo";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${Citylocation}&days=7&aqi=no&alerts=yes`;
        const [cityData, setCityData] = useState(null);

        useEffect(() => {
            fetchWeatherData();
        }, []);

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (!cityData) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }


        const { location, current, forecast } = cityData;
        return (
            <View style={styles.block}>
                <View>
                    <Text style={styles.temperature}>{Math.round(current.temp_c)}°C</Text>
                </View>
                <View>
                    <Text style={styles.city}>{location.name}</Text>
                    <Text style={styles.Country}>Japan</Text>
                </View>
                <View style={styles.weatherData}>
                    <View>
                        <Icon style={styles.icon} name="water-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.humidity}%</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="weather-windy" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.wind_kph}km/h</Text>
                    </View>
                </View>
            </View>
        );
    };

    const Citywise4 = () => {
        const Citylocation = "Dubai";
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${Citylocation}&days=7&aqi=no&alerts=yes`;
        const [cityData, setCityData] = useState(null);

        useEffect(() => {
            fetchWeatherData();
        }, []);

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (!cityData) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        const { location, current, forecast } = cityData;
        return (
            <View style={styles.block}>
                <View>
                    <Text style={styles.temperature}>{Math.round(current.temp_c)}°C</Text>
                </View>
                <View>
                    <Text style={styles.city}>{location.name}</Text>
                    <Text style={styles.Country}>UAE</Text>
                </View>
                <View style={styles.weatherData}>
                    <View>
                        <Icon style={styles.icon} name="water-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.humidity}%</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="weather-windy" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.wind_kph}km/h</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.Default} >Some default City's</Text>
            </View>
            <View style={styles.blockRow}>
                <Citywise1 />
                <Citywise2 />
            </View>
            <View style={styles.blockRow}>
                <Citywise3 />
                <Citywise4 />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edebe6",
    },
    Default: {
        marginTop: 15,
        marginLeft: 5,
        fontSize: 20,
        color: "#1f2d617a",
    },
    blockRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    block: {
        backgroundColor: "#f0f8ff5e",
        height: 155,
        width: 160,
        borderRadius: 10,
        marginRight: 15,
        marginLeft: 0,
    },
    city: {
        fontSize: 20,
        color: "#1f2d61",
        fontFamily: "Roboto",
        marginTop: 10,
        marginLeft: 20,
    },
    temperature: {
        fontSize: 30,
        color: "#1f2d61",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginLeft: 20,
        marginTop: 10,
    },
    Country: {
        fontSize: 15,
        color: "#1f2d617a",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginLeft: 20,
        marginTop: 5,
    },
    icon: {
        position: "absolute",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 5,
    },
    weatherType: {
        fontSize: 15,
        color: "#1f2d61",
        marginLeft: 30,
        marginTop: 10,
    },
    weatherData: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
});

export default Cityweather;
