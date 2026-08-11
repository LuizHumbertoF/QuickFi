import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userEmail: string | null;
    userId: number | null;
    userName: string | null;
    userSurname: string | null;
    login: (newToken: string, email: string, id: number, name: string, surname: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [ userId, setUserId ] = useState<number | null>(null);
    const [ userEmail, setUserEmail ] = useState<string | null>(null);
    const [ userName, setUserName ] = useState<string | null>(null);
    const [ userSurname, setUserSurname ] = useState<string | null>(null);

    const login = (newToken: string, email: string, id: number, name: string, surname: string) => {
        
        localStorage.setItem("@App:token", newToken);
        localStorage.setItem("@App:userName", name);
        
        setToken(newToken);
        setUserId(id);
        setUserEmail(email);
        setUserName(name);
        setUserSurname(surname);
    };

    const logout = () => {

        localStorage.removeItem("@App:token");
        localStorage.removeItem("@App:userName");
        
        setToken(null);
        setUserId(null);
        setUserEmail(null);
        setUserName(null);
        setUserSurname(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, userEmail, userName, userSurname, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
