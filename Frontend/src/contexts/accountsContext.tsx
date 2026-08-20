import { useState, createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { GetUserAccounts } from "@/controllers/getUserAccounts";
import { useAuth } from "./authContext";

export interface Account {
    id: number;
    name: string;
    type: string;
    institution?: string;
    color: string;
    amount: number;
    active: boolean;
}

interface greatestAmount {
    number: number;
    name: string;
}

const getUserAccounts = new GetUserAccounts();

interface AccountsContextType {
    accounts: Account[];
    accountNumbers: {
        totalAmount: number;
        greatestAmount: greatestAmount;
        totalActiveAccounts: number;
        totalAccounts: number;
    }
}

export const AccountsContext = createContext<AccountsContextType | undefined>(
    undefined
);

export function AccountsProvider({ children }: { children: ReactNode }) {

    const [accounts, setAccounts] = useState<Account[]>([]);
    const { token } = useAuth();


    console.log("token accounts:", token);

    useEffect(() => {
        if (!token) return;

        const loadAccounts = async () => {
            const response = await getUserAccounts.execute(token);
            setAccounts(response.data);
        };

        loadAccounts();
    }, [token]);

    const accountNumbers = useMemo(() => {

        let totalAmount = 0;
        let greatestAmount = {
            number: 0,
            name: ""
        };
        let totalActiveAccounts = 0;

        accounts.forEach((account) => {
            totalAmount += account.amount;

            if (account.amount > greatestAmount.number) {
                greatestAmount = {
                    number: account.amount,
                    name: account.name
                };
            }

            if (account.active) {
                totalActiveAccounts++;
            }
        });

        return {
            totalAmount,
            greatestAmount,
            totalActiveAccounts,
            totalAccounts: accounts.length
        };

    }, [accounts]);


    return (
        <AccountsContext.Provider
            value={{
                accounts,
                accountNumbers
            }}
        >
            {children}
        </AccountsContext.Provider>
    );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
