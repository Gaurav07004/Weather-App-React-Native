import { RefreshControl, SafeAreaView, ScrollView, Text, StyleSheet, View, Image, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

const API_KEY = "d1073f45be864c549e085206231706";
let API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

const CurrentWeather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const response = await fetch(`${API_URL}&q=${location.coords.latitude},${location.coords.longitude}`);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            Alert.alert("Error", "Something went wrong");
        } else {
            setForecast(data);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const { location, current } = forecast;

    const getImagePath = () => {
        if (current.temp_c < -10) {
            return require("../assets/snowfall.png");
        } else if (current.temp_c >= -10 && current.temp_c <= 0) {
            return require("../assets/snowfall.png");
        } else if (current.temp_c > 0 && current.temp_c <= 29) {
            if (current.condition.text === "Patchy rain possible") {
                return require("../assets/sun-cloud.png");
            } else if (current.condition.text === "Rainy") {
                return require("../assets/rain.png");
            } else {
                return require("../assets/sun-cloud.png");
            }
        } else {
            if (current.condition.text === "Patchy rain possible") {
                return require("../assets/sun-cloud.png");
            } else if (current.condition.text === "Rainy") {
                return require("../assets/rain.png");
            } else {
                return require("../assets/sunny.png");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadForecast} />} style={{ marginTop: 10 }}>
                <View style={styles.current}>
                    <View>
                        <Icon style={styles.locationicon} name="map-marker-radius-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.location}>Your Location Now</Text>
                    </View>
                </View>
                <View style={styles.currentLocation}>
                    <Text style={styles.Cityname}>{location.name}, </Text>
                    <Text style={styles.Cityname}>{location.region}</Text>
                </View>
                <View>
                    <Text style={styles.country}>{location.country}</Text>
                </View>
                <View>
                    <Image source={getImagePath()} style={styles.weatherImage} />
                </View>
                <View style={styles.weatherarea}>
                    <Text style={styles.weatherDescription}>{current.condition.text}</Text>
                </View>
                <View>
                    <Text style={styles.Main_temperature}>{Math.round(current.temp_c)}°C</Text>
                </View>
                <View style={styles.weatherData}>
                    <View>
                        <Icon style={styles.icon} name="water-outline" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.humidity}%</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="alpha-i-circle-outline" color={"#647097eb"} size={24.5} />
                        <Text style={styles.weatherType}>{current.pressure_mb}Bar</Text>
                    </View>
                    <View>
                        <Icon style={styles.icon} name="weather-windy" color={"#647097eb"} size={25} />
                        <Text style={styles.weatherType}>{current.wind_kph}km/h</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.day}>Weather details</Text>
                </View>
                <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="thermometer" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>Feels like</Text>
                            <Text style={styles.Weathertype}>{Math.round(current.feelslike_c)}</Text>
                            <Text style={styles.Weatherdimension}>°C</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="weather-windy" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>W Wind</Text>
                            <Text style={styles.Weathertype}>{Math.round(current.wind_kph)}</Text>
                            <Text style={styles.Weatherdimension}>km/h</Text>
                        </View>
                    </View>
                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="water-outline" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>Humidity</Text>
                            <Text style={styles.Weathertype}>{Math.round(current.humidity)}</Text>
                            <Text style={styles.Weatherdimension}>%</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="white-balance-sunny" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>UV</Text>
                            <Text style={styles.Weathertype}>{Math.round(current.uv)}</Text>
                            <Text style={styles.Weatherdimension_UV_Vis}>strong</Text>
                        </View>
                    </View>
                    <View style={styles.blockRow}>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="eye-outline" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>Visibility</Text>
                            <Text style={styles.Weathertype}>{Math.round(current.vis_km)}</Text>
                            <Text style={styles.Weatherdimension_UV_Vis}>km</Text>
                        </View>
                        <View style={styles.block}>
                            <Icon style={styles.WeatherIcon} name="waves" color={"#1f2d61cc"} size={30} />
                            <Text style={styles.Weatherdata}>Air pressure </Text>
                            <Text style={styles.Weathertype}>{Math.round(current.pressure_mb)}</Text>
                            <Text style={styles.Weatherdimension_pressure}>hPa</Text>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#edebe6",
    },
    location: {
        fontSize: 15,
        color: "#1f2d617a",
        marginLeft: 30,
        marginTop: 15,
    },
    locationicon: {
        position: "absolute",
        fontSize: 20,
        marginTop: 12,
        marginLeft: 5,
    },
    Cityname: {
        fontSize: 20,
        color: "#1f2d61",
    },
    current: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
    },
    currentLocation: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 80,
    },
    country: {
        fontSize: 20,
        color: "#1f2d617a",
        textAlign: "center",
        marginTop: 5,
    },
    weatherImage: {
        height: 200,
        width: 200,
        marginLeft: 90,
    },
    weatherDescription: {
        position: "absolute",
        fontSize: 20,
        color: "#1f2d61",
        textAlign: "center",
        top: 8,
    },
    weatherarea: {
        position: "absolute",
        backgroundColor: "#dedbd5",
        borderRadius: 50,
        alignItems: "center",
        borderRadius: 50,
        height: 40,
        width: "30%",
        marginLeft: 125,
        marginTop: 320,
    },
    Main_temperature: {
        fontSize: 60,
        color: "#1f2d61",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginLeft: 120,
        marginTop: 30,
    },
    weatherType: {
        fontSize: 17,
        color: "#1f2d61",
        marginLeft: 35,
        marginRight: 40,
    },
    weatherData: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
        marginLeft: 20,
    },
    icon: {
        position: "absolute",
        fontSize: 20,
        marginLeft: 10,
    },
    blockRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    block: {
        backgroundColor: "#61646c1a",
        height: 130,
        width: 160,
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
    },
    day: {
        fontSize: 19,
        marginTop: 20,
        marginLeft: 20,
        color: "#1f2d61ba",
        fontFamily: "Roboto",
    },
    Weatherdata: {
        color: "#1f2d61ba",
        fontSize: 16,
        marginTop: 5,
        marginLeft: 5,
    },
    Weathertype: {
        color: "#1f2d61",
        fontSize: 28,
        marginTop: 3,
        marginLeft: 5,
    },
    Weatherdimension: {
        position: 'absolute',
        color: "#1f2d61ba",
        fontSize: 19,
        marginTop: 87,
        marginLeft: 55,
    },
    Weatherdimension_UV_Vis: {
        position: 'absolute',
        color: "#1f2d61ba",
        fontSize: 19,
        marginTop: 87,
        marginLeft: 42,
    },
    Weatherdimension_pressure: {
        position: 'absolute',
        color: "#1f2d61ba",
        fontSize: 19,
        marginTop: 87,
        marginLeft: 85,
    },
});

export default CurrentWeather;
