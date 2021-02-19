import React from "react";
import { ChatRoom } from "../../types";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
	chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
	const { chatRoom } = props;
	const navigation = useNavigation();
	const user = chatRoom.users[1];

	const onClick = () => {
		navigation.navigate("Chat Room", {
			id: chatRoom.id,
			name: user.name,
			uri: user.imageUri,
		});
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: user.imageUri }} style={styles.avatar} />
					<View>
						<Text style={styles.username}>{user.name}</Text>
						<Text style={styles.lastMessage}>
							{chatRoom.lastMessage.content}
						</Text>
					</View>
				</View>
				<Text style={styles.time}>
					{moment(chatRoom.lastMessage.createdAt).format("MM/DD/YYYY")}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ChatListItem;
