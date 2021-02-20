import { StyleSheet } from "react-native";
import Colors from "../../constants/AppColors";

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	messageBox: {
		borderRadius: 5,
		padding: 10,
	},
	name: {
		fontWeight: "bold",
		color: Colors.light.tint,
		marginBottom: 5,
	},
	message: {},
	time: {
        alignSelf:"flex-end",
        color:"grey"
    },
});

export default styles;
