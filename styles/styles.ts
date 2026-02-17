import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f3",
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#39385b",
    paddingBottom: 70,
    fontFamily: "cursive",
  },

  formCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "900",
    color: "#1a1a1a",
    fontSize: 26,
  },

  input: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },

  button: {
    marginTop: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#39385b",
  },

  toggleButton: {
    marginTop: 16,
  },
});
