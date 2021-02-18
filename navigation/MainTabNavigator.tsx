import { Ionicons, Fontisto } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { color } from "react-native-reanimated";
import Colors from "../constants/AppColors";
import useColorScheme from "../hooks/useColorScheme";
import ChatScreen from "../screens/ChatScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { Dimensions, View } from "react-native";
import { MainTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();
const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_BAR_WIDTH = (90 * SCREEN_WIDTH) / 100;
const CAMERA_WIDTH = (10 * SCREEN_WIDTH) / 100;

export default function MainTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<MainTab.Navigator
			initialRouteName='Chats'
			tabBarOptions={{
				activeTintColor: Colors[colorScheme].background,
				style: {
					backgroundColor: Colors[colorScheme].tint,
				},
				indicatorStyle: {
					backgroundColor: Colors[colorScheme].background,
					height: 4,
				},
				labelStyle: {
					fontWeight: "bold",
				},
				showIcon: true,
			}}>
				<MainTab.Screen
					name='Camera'
					component={TabOneNavigator}
					options={{
						tabBarIcon: ({ color }) => (
							<Fontisto name='camera' color={color} size={18} />
						),
						tabBarLabel: () => null,
            
					}}
				/>
			<MainTab.Screen name='Chats' component={TabTwoNavigator} />
			<MainTab.Screen name='Status' component={TabTwoNavigator} />
			<MainTab.Screen name='Calls' component={TabTwoNavigator} />
		</MainTab.Navigator>
	);
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
	return (
		<TabOneStack.Navigator>
			<TabOneStack.Screen
				name='TabOneScreen'
				component={ChatScreen}
				options={{ headerTitle: "Tab One Title" }}
			/>
		</TabOneStack.Navigator>
	);
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
	return (
		<TabTwoStack.Navigator>
			<TabTwoStack.Screen
				name='TabTwoScreen'
				component={TabTwoScreen}
				options={{ headerTitle: "Tab Two Title" }}
			/>
		</TabTwoStack.Navigator>
	);
}
