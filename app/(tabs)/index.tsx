import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { habitStyles } from "@/styles/styles";
import { Habit } from "@/Types/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user?.$id) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments<Habit>(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal("user_id", [user!.$id])]
      );
      setHabits(response.documents);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  return (
    <View style={habitStyles.listScreen}>
     
      <View style={habitStyles.header}>
        <Text variant="headlineSmall" style={{color:"#111"}}>Today's Habits</Text>
        <Button mode="text" onPress={signOut}>
          Sign out
        </Button>
      </View>

   
      {habits.length === 0 && (
        <Text style={habitStyles.emptyText}>
          No habits yet... Add your first habit!
        </Text>
      )}

     
      {habits.map((habit) => (
        <View key={habit.$id} style={habitStyles.card}>
          <Text variant="titleMedium">{habit.title}</Text>
          <Text>{habit.description}</Text>

          <View style={habitStyles.meta}>
            <View style={habitStyles.streak}>
              <MaterialCommunityIcons
                name="fire"
                size={18}
                color="#ff9800"
              />
              <Text>{habit.streak_count} day streak</Text>
            </View>

            <Text>{habit.frequency}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
