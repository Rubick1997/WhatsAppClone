import React from "react";
import { View, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import chatRoomData from "../data/Chats";
import ChatMessage from "../components/ChatMessage";
import BG from "../assets/images/BG.png";
import InputBox from "../components/InputBox";

const ChatRoomScreen = () => {
	const route = useRoute();

	// console.log(route.params)
	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			<FlatList
				data={chatRoomData.messages}
				renderItem={({ item }) => <ChatMessage message={item} />}
				inverted
			/>

			<InputBox />
		</ImageBackground>
	);
};

export default ChatRoomScreen;
