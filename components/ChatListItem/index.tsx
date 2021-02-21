import React, { useEffect, useState } from "react";
import { ChatRoom } from "../../types";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export type ChatListItemProps = {
	chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
	const { chatRoom } = props;
	const [otherUser, setOtherUser] = useState();
	const navigation = useNavigation();

	useEffect(() => {
		const getOtherUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			if (chatRoom.chatRoomUsers.items[0].user.id ===userInfo.attributes.sub){
				setOtherUser(chatRoom.chatRoomUsers.items[1].user)
			}else{
				setOtherUser(chatRoom.chatRoomUsers.items[0].user)
			}
		};
		getOtherUser();
	}, []);

	const onClick = () => {
		navigation.navigate("ChatRoom", {
			id: chatRoom.id,
			name: otherUser.name,
			uri: otherUser.imageUri,
		});
	};

	if(!otherUser){
		return null;
	}

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
					<View>
						<Text style={styles.username}>{otherUser.name}</Text>
						<Text style={styles.lastMessage}>
							{chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
						</Text>
					</View>
				</View>
				<Text style={styles.time}>
					{chatRoom.lastMessage &&
						moment(chatRoom.lastMessage.createdAt).format("MM/DD/YYYY")}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ChatListItem;
