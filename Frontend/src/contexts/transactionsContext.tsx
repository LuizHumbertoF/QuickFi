import { useState, createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { GetUserTransactions } from "@/controllers/getUserTransactions";
import { useAuth } from "./authContext";

export interface Transaction {
    id: number;
    accountId: number;
    category: string;
    type: string;
    amount: number;
    description: string;
    transactionDate: string;
    paymentType: string | null;
    recurrentTransaction: boolean;
}

interface AccountTransactions {
    account: {
        id: number;
        userId: number;
        name: string;
        type: string;
        institution: string | null;
        color: string;
        amount: number;
        active: boolean;
        createdAt: string;
        updatedAt: string;
    };
    transactions: Transaction[];
}

export interface DailyBalance {
    date: string;
    balance: number;
}

interface TransactionsContextType {
    transactions: AccountTransactions[],
    incomes: number,
    expenses: number,
    positiveAmount: boolean,
    totalAmount: number,
    flatTransactions: any,
    dailyBalances: DailyBalance[];
}

const getUserTransactions = new GetUserTransactions();

export const TransactionsContext = createContext<TransactionsContextType | undefined>(
    undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {

    const [transactions, setTransactions] = useState<AccountTransactions[]>([]);
    const [incomes, setIncomes ] = useState<number>(0);
    const [expenses, setExpenses ] = useState<number>(0);
    const [positiveAmount, setPositiveAmount] = useState<boolean>(true);
    const [totalAmount, setTotalAmount ] = useState<number>(0);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;

        const loadTransactions = async () => {
            const response = await getUserTransactions.execute(token);

            setTransactions(response.data);
        };

        loadTransactions();

    }, [token]);

    const flatTransactions = transactions.flatMap((accountData) =>
        accountData.transactions.map((transaction) => ({
            ...transaction,
            account: accountData.account
        }))
    );


    const dailyBalances = useMemo(() => {
        if (!flatTransactions || flatTransactions.length === 0) return [];

        // 1. Ordenar as transações da mais antiga para a mais nova
        const sortedTransactions = [...flatTransactions].sort((a, b) => 
            new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime()
        );

        // 2. Agrupar os valores por dia (calculando o fluxo de caixa diário)
        const flowByDate: Record<string, number> = {};
        
        sortedTransactions.forEach((transaction) => {
            // Formata a data para o padrão do gráfico (Ex: "01 Jan")
            // O "T00:00:00" evita bugs de fuso horário do JavaScript
            const dateStr = new Date(transaction.transactionDate + "T00:00:00")
                .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                .replace('.', ''); // Remove o ponto (ex: de "jan." para "jan")

            if (!flowByDate[dateStr]) {
                flowByDate[dateStr] = 0;
            }

            // Se for receita soma, se for despesa subtrai
            const amount = transaction.type.toLowerCase() === "receita" 
                ? transaction.amount 
                : -transaction.amount;

            flowByDate[dateStr] += amount;
        });

        // 3. Transformar o agrupamento em uma soma acumulada (Saldo real)
        let runningBalance = 0;
        const chartData: DailyBalance[] = Object.entries(flowByDate).map(([date, dailyNetFlow]) => {
            runningBalance += dailyNetFlow;
            
            return {
                date: date,
                balance: runningBalance // Lembre-se de dividir por 100 lá no gráfico se estiver em centavos
            };
        });

        return chartData;

    }, [flatTransactions]);


    useEffect(() => {

        let totalIncomes = 0;
        let totalExpenses = 0;

        transactions.forEach((accountData) => {

            accountData.transactions.forEach((transaction) => {

                if (transaction.type.toLowerCase() === "receita") {
                    totalIncomes += transaction.amount;
                }

                if (transaction.type.toLowerCase() === "despesa") {
                    totalExpenses += transaction.amount;
                }

            });

        });

        const total = totalIncomes - totalExpenses;

        setIncomes(totalIncomes);
        setExpenses(totalExpenses);

        if (total >= 0) {
            setPositiveAmount(true);
            setTotalAmount(total);
        } else {
            setPositiveAmount(false);
            setTotalAmount(Math.abs(total));
        }

    }, [transactions]);


    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                incomes,
                expenses,
                positiveAmount,
                totalAmount,
                flatTransactions,
                dailyBalances
            }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
