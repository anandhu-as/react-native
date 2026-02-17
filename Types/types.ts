import { Models } from "react-native-appwrite";

export interface AuthFormProps {
  isSignUp: boolean;
  email: string;
  password: string;
  error: string | null;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  handleAuth: () => void;
  handleSwitchMode: () => void;
}
export type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  loading: boolean;
};
