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
