import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { styles } from "@/styles/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
    Button,
    SegmentedButtons,
    TextInput,
    useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"] as const;
type Frequency = (typeof FREQUENCIES)[number];

const AddHabitScreen = () => {
    const { user } = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState<Frequency>("daily");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!user) return;

        try {
            setError("");

            await databases.createDocument(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                ID.unique(),
                {
                    user_id: user.$id,
                    title,
                    description,
                    frequency,
                    streak_count: 0,
                    last_completed: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                }
            );

            router.back();
        } catch (e: any) {
            setError(e?.message || "Something went wrong");
        }
    };

    return (
        <>
            <View style={styles.container2}>
                <TextInput
                    label="Title"
                    mode="outlined"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    error={!!error}
                />

                <TextInput
                    label="Description"
                    mode="outlined"
                    value={description}
                    multiline
                    numberOfLines={3}
                    onChangeText={setDescription}
                    style={styles.input}
                    error={!!error}
                />

                {error ? (
                    <Text style={{ color: theme.colors.error, marginBottom: 8 }}>
                        {error}
                    </Text>
                ) : null}

                <View style={styles.frequencyContainer}>
                    <SegmentedButtons
                        value={frequency}
                        onValueChange={(value) => {
                            if (value) {
                                setFrequency(value as Frequency);
                            }
                        }}
                        buttons={FREQUENCIES.map((freq) => ({
                            value: freq,
                            label:
                                freq.charAt(0).toUpperCase() + freq.slice(1),
                        }))}
                    />
                </View>
            </View>

            <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!title || !description}
            >
                Add Habit
            </Button>
        </>
    );
};

export default AddHabitScreen;
