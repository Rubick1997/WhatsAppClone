import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		width: "100%",
        height:"100%",
        marginBottom:9,
		alignSelf:"flex-start"
	},
	leftContainer: {
		flexDirection: "row",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 50,
		marginRight: 15,
	},
	headerTitle: {
		fontWeight: "bold",
		fontSize: 17,
        justifyContent: "space-between",
        color:"white"
	},
});

export default styles;

