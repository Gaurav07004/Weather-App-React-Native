import React from "react";
import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, ScrollView } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { NativeViewGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

const WeatherInfo = ({ WeatherData }) => {
    const { location, current, forecast } = WeatherData;
    if (!forecast || !forecast.forecastday || forecast.forecastday.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No forecast data available</Text>
            </View>
        );
    }

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
    const hourData = forecast.forecastday[0].hour;
    const forecastday = forecast.forecastday;

    const getIconName = (item) => {
        const time = item.time.slice(11, 16);
        const isDayTime = time >= "06:00" && time <= "18:00";
        const temperature = item.temp_c;
        const condition = item.condition.text;

        if (isDayTime) {
            if (temperature > 25 && condition === "rainy") {
                return "weather-pouring";
            } else if (temperature > 30) {
                return "weather-sunny";
            } else if (temperature >= 0 && temperature <= 28 && condition === "Rainy") {
                return "weather-pouring";
            } else if (temperature >= 0 && temperature <= 29) {
                return "weather-partly-cloudy";
            } else if (temperature < 0) {
                return "weather-snowy";
            }
        } else {
            if (temperature > 25 && condition === "Rainy") {
                return "weather-pouring";
            } else if (temperature > 30) {
                return "weather-night";
            } else if (temperature >= 0 && temperature <= 28 && condition === "Rainy") {
                return "weather-pouring";
            } else if (temperature >= 0 && temperature <= 30) {
                return "weather-night-partly-cloudy";
            } else if (temperature < 0) {
                return "weather-snowy";
            }
        }

        return "weather-cloudy";
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <NativeViewGestureHandler>
                <ScrollView>
                    <View>
                        <Text style={styles.city}>{location.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.Main_temperature}>{Math.round(current.temp_c)}°C</Text>
                    </View>
                    <View style={styles.weatherarea}>
                        <Text style={styles.weatherDescription}>{current.condition.text}</Text>
                    </View>
                    <View style={styles.sun}>
                        <Image source={getImagePath()} style={styles.weatherImage} />
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
                        <Text style={styles.day}>Today</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <FlatList
                            horizontal
                            data={hourData}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) => (
                                <View style={styles.timeContainer}>
                                    <View style={styles.Time_set}>
                                        <Text style={styles.time}>{item.time.slice(11, 13)}</Text>
                                        <Text style={styles.AM_PM_Set}>{item.time.slice(11, 13) >= 12 ? "PM" : "AM"}</Text>
                                    </View>
                                    <Icon name={getIconName(item)} color="#050866" size={30} style={styles.Icon} />
                                    <Text style={styles.temperature}>{Math.round(item.temp_c)}°C</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View>
                        <Text style={styles.day}>07-Day weather forecast</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <FlatList
                            data={forecastday}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={({ item }) => (
                                <View style={styles.forecastdayContainer}>
                                    <Text style={styles.days}>{item.date}</Text>
                                    <View style={styles.forecastday_temperature_Container}>
                                        <Text style={styles.forecastdaytemperature}>Max: {Math.round(item.day.maxtemp_c)}°C</Text>
                                        <Text style={styles.forecastdaytemperature}>/</Text>
                                        <Text style={styles.forecastdaytemperature}>Min: {Math.round(item.day.mintemp_c)}°C</Text>
                                    </View>
                                </View>
                            )}
                        />
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
            </NativeViewGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edebe6",
    },
    sun: {
        position: "absolute",
        top: 20,
        left: 210,
    },
    weatherImage: {
        height: 250,
        width: 250,
    },
    city: {
        fontSize: 30,
        color: "#1f2d61",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginTop: 50,
        marginLeft: 30,
    },
    Main_temperature: {
        fontSize: 60,
        color: "#1f2d61",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginLeft: 30,
        marginTop: 10,
    },
    weatherDescription: {
        fontSize: 20,
        color: "#1f2d61",
        fontWeight: "600",
        fontFamily: "Roboto",
        marginBottom: 10,
        top: 5,
        left: 20,
        overflow: "hidden",
        marginLeft: 15,
    },
    weatherarea: {
        backgroundColor: "#dedbd5",
        borderRadius: 50,
        height: 36,
        width: "30%",
        marginTop: 20,
        marginLeft: 20,
        overflow: "hidden",
    },
    icon: {
        position: "absolute",
        top: 8,
        left: 10,
    },
    weatherType: {
        fontSize: 17,
        color: "#1f2d61",
        marginLeft: 42,
        top: 10,
    },
    weatherData: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40,
        marginBottom: 20,
    },
    day: {
        fontSize: 19,
        marginTop: 20,
        marginLeft: 20,
        color: "#1f2d61ba",
        fontFamily: "Roboto",
    },
    timeContainer: {
        alignItems: "stretch",
        marginLeft: 7,
        marginTop: 8,
    },
    time: {
        fontSize: 16,
        marginLeft: 19,
        color: "#1f2d61",
        fontFamily: "Roboto",
    },
    temperature: {
        fontSize: 22,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 20,
        color: "#050866",
        fontFamily: "Roboto",
    },
    Time_set: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    AM_PM_Set: {
        fontSize: 16,
        marginLeft: 20,
        color: "#1f2d61",
        left: -15,
    },
    Icon: {
        marginLeft: 20,
        marginTop: 8,
        marginBottom: 8,
    },
    forecastdayContainer: {
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 10,
    },
    days: {
        position: "absolute",
        fontSize: 17,
        color: "#050866",
        fontFamily: "Roboto",
    },
    forecastday_temperature_Container: {
        flexDirection: "row",
        marginLeft: 150,
    },
    forecastdaytemperature: {
        fontSize: 15,
        marginLeft: 10,
        color: "#050866",
        fontFamily: "Roboto",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#61646c1a",
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    blockRow: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
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
    WeatherIcon: {},
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

export default WeatherInfo;
