import React from "react";
import { ChatRoom } from "../../types";
import { View, Text } from "react-native";


const ChatListItem = (chatRoom: ChatRoom) => {
	<View>
		<Text>{chatRoom.lastMessage.content}</Text>
	</View>;
};

export default ChatListItem;
