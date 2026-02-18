import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";

const StreaksScreen = () => {
    const { user } = useAuth()


    return (<View>
        <Text>user {user?.email} </Text>
    </View>)
}
export default StreaksScreen;