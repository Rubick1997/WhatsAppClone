import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import AppColors from "../constants/AppColors";
import App from "../App";
import { View, Text } from "react-native";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ChatHeader from "../components/ChatHeader";
import {
	AntDesign,
	Octicons,
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome5,
} from "@expo/vector-icons";
import ContactsScreen from "../screens/ContactsScreen";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: AppColors.light.tint,
					shadowOpacity: 0,
					elevation: 0,
				},
				headerTintColor: AppColors.light.background,
				headerTitleAlign: "left",
				headerTitleStyle: { fontWeight: "bold" },
			}}>
			<Stack.Screen
				name='Root'
				component={MainTabNavigator}
				options={{
					title: "WhatsApp",
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								width: 60,
								justifyContent: "space-between",
								marginRight: 10,
							}}>
							<Octicons name='search' size={22} color={"white"} />
							<MaterialCommunityIcons
								name='dots-vertical'
								size={22}
								color={"white"}
							/>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name='ChatRoom'
				component={ChatRoomScreen}
				options={{
					headerBackTitleVisible: false,
					headerTitle: () => <ChatHeader />,
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								width: 100,
								justifyContent: "space-between",
								marginRight: 10,
							}}>
							<FontAwesome5 name='video' size={22} color={"white"} />
							<MaterialIcons name='call' size={22} color={"white"} />
							<MaterialCommunityIcons
								name='dots-vertical'
								size={22}
								color={"white"}
							/>
						</View>
					),
				}}
			/>
			<Stack.Screen
				name='Contacts'
				component={ContactsScreen}
				options={{ headerBackTitleVisible: false }}
			/>

			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
		</Stack.Navigator>
	);
}
