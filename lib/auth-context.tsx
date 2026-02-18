import { AuthContextType } from "@/Types/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { account } from "./appwrite";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] =
        useState<Models.User<Models.Preferences> | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            await account.create("unique()", email, password);
            await signIn(email, password);
            return null;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "An error occurred";
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const session = await account.get()
            setUser(session)
            await getUser();
            return null;
        } catch (error) {
            if (error instanceof Error) return error.message;
            return "An error occurred during signin";
        }
    };
    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null)
        } catch (error) {
            console.log(error);


        }
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};
