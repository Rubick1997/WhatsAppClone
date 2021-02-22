import React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import styles from "./style";

const ChatHeader = () => {
	const route = useRoute();

	const user = route.params;
	return (
		<View style={styles.header}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: user.imageUri }} style={styles.avatar} />
					<View>
						<Text style={styles.headerTitle}>{user.name}</Text>
					</View>
				</View>
		</View>
	); 
};


export default ChatHeader;
