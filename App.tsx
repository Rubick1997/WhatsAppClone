import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import Config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure(Config);

const randomImages = "https://loremflickr.com/640/360";

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	//runs only when app is first mounted

	useEffect(() => {
		//get authentication from Auth
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});

			if (userInfo) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);

				//check if the user exists

				if (userData.data.getUser) {
					console.log("User is already registered in database");
					return;
				}

				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.username,
					imageUri: randomImages,
					status: "Hey, I am using WhatsApp",
				};

				//create the user
				await API.graphql(graphqlOperation(createUser, { input: newUser }));
			}
		};
		fetchUser();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
export default withAuthenticator(App);
