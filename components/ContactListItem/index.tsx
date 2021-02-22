import React from "react";
import { User } from "../../types";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import {
	createChatRoom,
	createChatRoomUser,
} from "../../src/graphql/mutations";

export type ContactListItemProps = {
	user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
	const { user } = props;
	const navigation = useNavigation();

	const onClick = async () => {
		try {
			//create new chat room
			const newChatRoomData = await API.graphql(
				graphqlOperation(createChatRoom, {
					input: { lastMessageID: "4cdec339-7219-4072-9ch6-f0r8950742b7a" },
				})
			);

			if (!newChatRoomData.data) {
				console.log("Failed to create a Chat Room");
				return;
			}
			const newChatRoom = newChatRoomData.data.createChatRoom;
			//add user to the chat room
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: user.id,
						chatRoomID: newChatRoom.id,
					},
				})
			);
			//add authenticated user to the chatroom
			const userInfo = await Auth.currentAuthenticatedUser();
			await API.graphql(
				graphqlOperation(createChatRoomUser, {
					input: {
						userID: userInfo.attributes.sub,
						chatRoomID: newChatRoom.id,
					},
				})
			);

			navigation.navigate("ChatRoom", {
				id: newChatRoom.id,
				name: user.name,
				imageUri: user.imageUri,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: user.imageUri }} style={styles.avatar} />
					<View>
						<Text style={styles.username}>{user.name}</Text>
						<Text style={styles.status}>{user.status}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ContactListItem;
