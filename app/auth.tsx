import { useAuth } from "@/lib/auth-context";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
// KeyboardAvoidingView → prevents keyboard hiding input fields

const AuthScreen = () => {
    const router=useRouter()
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    //state to track what the user types
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const behaviorOS = Platform.OS === "ios" ? "padding" : "height";

    const checkSignup = isSignUp ? "Create Account" : "Welcome back...";
    const { signIn, signUp } = useAuth()//auth hook
    const handleSwitchMode = () => {
        setIsSignUp((curr) => !curr);
        setError(null);
    };

    const theme = useTheme();

    ///to handle auth
    const handleAuth = async () => {


        if (!email || !password) {
            setError("Please fill all credentials");
            return;
        }
        if (isSignUp) {
            const error = await signUp(email, password)
            if (error) {
                setError(error)
                return
            }
        } else {
            const error = await signIn(email, password)
            if (error) {
                setError(error)
                return
            }
            router.replace("/")
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={behaviorOS}>
            <View style={styles.content}>
                <Text style={styles.name}>Habit Tracker 🔖</Text>

                <View style={styles.formCard}>
                    <Text style={styles.title}>{checkSignup}</Text>

                    <TextInput
                        label="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="example@gmail.com"
                        mode="outlined"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        label="Password"
                        autoCapitalize="none"
                        secureTextEntry
                        mode="outlined"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error && (
                        <Text style={{ color: theme.colors.error }}>{error}</Text>
                    )}

                    <Button
                        onPress={handleAuth}
                        mode="contained"
                        style={styles.button}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    <Button onPress={handleSwitchMode} style={styles.toggleButton}>
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;
