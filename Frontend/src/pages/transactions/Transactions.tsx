import { Sidebar } from "../sidebar/Sidebar"
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LuTrendingUp } from "react-icons/lu";
import { LuTrendingDown, LuPiggyBank, LuLightbulb } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { GetUserTransactions } from "@/controllers/getUserTransactions";
import {
    LuArrowDown,
    LuArrowUp,
    LuEllipsisVertical
} from "react-icons/lu";
import { CategorySummary } from "./CategorySummary";
import { FaLightbulb } from "react-icons/fa";

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

const getUserTransactions = new GetUserTransactions();

export function Transactions() {
    
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<AccountTransactions[]>([]);
    const [incomes, setIncomes ] = useState<number>(0);
    const [expenses, setExpenses ] = useState<number>(0);
    const [positiveAmount, setPositiveAmount] = useState<boolean>(true);
    const [totalAmount, setTotalAmount ] = useState<number>(0);
    
    const { token } = useAuth();


    console.log("token accounts:", token);

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

        <div className="w-screen h-screen bg-[#E2E8F0]/30 flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex flex-col p-12 gap-6">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Transações</h1>
                        <p className="text-sm text-[#475569]">Acompanhe todas as suas entradas e saídas.</p>
                    </div>

                    <div className="flex items-center justify-center h-12 ml-auto">
                        <input className="h-9 border shadow-xs border-[#E2E8F0] p-2 rounded-md"
                            placeholder="Pesquisar transação..."
                        />

                        <button className="mr-7 cursor-pointer p-1 rounded-full transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15">
                            <MdOutlineSearch size={28}/>
                        </button>

                        <button className="cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md border shadow-xs border-[#E2E8F0] font-semibold">
                            <LuFilter className="text-[#475569]" size={20}/>
                            <p className="text-[#475569]">Filtros</p>
                        </button>

                        <button 
                            className="cursor-pointer p-1 transition-all duration-200 hover:-translate-y-1 bg-[#10B981] shadow-md ml-2 flex items-center justify-center gap-1 py-2 px-4 rounded-md text-white font-semibold"
                            onClick={() => navigate("newTransaction")}
                        >
                            <MdAdd size={20}/>
                            <p>Nova Transação</p>
                        </button>
                    </div>
                </div>

                <div className="flex w-full h-32 ">
                    
                    <div className="flex w-full h-full gap-5">
                        <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-[#10B981]/10 rounded-md shadow-md w-1/2 h-1/2">
                                    <LuTrendingUp className="text-[#10B981] h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Receitas</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{(incomes / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-red-600/10 rounded-md shadow-md w-1/2 h-1/2">
                                    <LuTrendingDown className="text-red-600 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Despesas</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{(expenses / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-yellow-500/10 rounded-md shadow-md w-1/2 h-1/2">
                                    <LuPiggyBank className="text-yellow-500 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Total do período</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{(totalAmount / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                                { positiveAmount ?
                                    (<p className="text-sm font-semibold text-[#10B981]">Saldo positivo</p>)
                                    :
                                    (<p className="text-sm font-semibold text-red-600">Saldo negativo</p>)
                                }
                            </div>
                        </div>

                        <div className="bg-white rounded-lg w-1/4 flex">
                            <div className="w-full h-full gap-3 bg-[#10B981]/10 flex p-3 shadow-lg border border-[#94A3B8]/10 rounded-lg">
                                <FaLightbulb className="w-6 h-6 text-[#10B981]"/>
                                <div className="w-full h-full gap-2">
                                    <p className="text-[#1E293B] font-semibold">Dica QuickFi</p>
                                    <p className="text-[#5e6369] text-sm">Melhore isso isso e aquilo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex w-full h-full ">
                    <div className="flex flex-col w-5/7 h-80 bg-white border rounded-lg shadow-lg border-[#94A3B8]/20 overflow-hidden">

                        {/* Cabeçalho */}
                        <div className="grid grid-cols-[80px_2fr_1.5fr_1.5fr_120px_100px_40px] gap-4 w-full items-center px-4 py-4 border-b border-[#94A3B8]/20 shrink-0">
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Data
                            </p>
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Descrição
                            </p>
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Categoria
                            </p>
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Conta
                            </p>
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Valor
                            </p>
                            <p className="text-xs font-semibold text-[#7b8491]">
                                Tipo
                            </p>
                            {/* Div vazia para alinhar com o botão de Opções */}
                            <div></div>
                        </div>


                        {/* Transações */}
                        <div className="flex flex-col w-full overflow-y-auto">

                            {flatTransactions.map((transaction, index) => {

                                const isIncome = transaction.type.toLowerCase() === "receita";

                                const formattedDate = new Date(transaction.transactionDate + "T00:00:00")
                                    .toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })
                                    .replace(".", "");

                                return (

                                    <div
                                        key={transaction.id}
                                        className={`
                                            grid grid-cols-[80px_2fr_1.5fr_1.5fr_120px_100px_40px] gap-4 w-full items-center px-4 py-3
                                            transition-colors duration-150 hover:bg-[#F8FAFC]
                                            ${index !== flatTransactions.length - 1 ? "border-b border-[#E2E8F0]" : ""}
                                        `}
                                    >

                                        {/* Data */}
                                        <div className="flex flex-col gap-2">
                                            <div
                                                className={`
                                                    w-7 h-7 rounded-full flex items-center justify-center shrink-0
                                                    ${isIncome ? "bg-[#10B981]/10" : "bg-red-500/10"}
                                                `}
                                            >
                                                {isIncome ? (
                                                    <LuArrowUp className="w-4 h-4 text-[#10B981]" />
                                                ) : (
                                                    <LuArrowDown className="w-4 h-4 text-red-500" />
                                                )}
                                            </div>

                                            <p className="text-xs text-[#64748B]">
                                                {formattedDate}
                                            </p>
                                        </div>


                                        {/* Descrição */}
                                        <div className="flex">
                                            <p className="text-sm font-semibold text-[#1E293B] truncate">
                                                {transaction.description}
                                            </p>
                                        </div>


                                        {/* Categoria */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                                            <p className="text-sm text-[#64748B] truncate">
                                                {transaction.category}
                                            </p>
                                        </div>


                                        {/* Conta */}
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-[#64748B] truncate">
                                                {transaction.account.name}
                                            </p>
                                        </div>


                                        {/* Valor */}
                                        <div>
                                            <p
                                                className={`
                                                    text-sm font-semibold
                                                    ${isIncome ? "text-[#10B981]" : "text-red-500"}
                                                `}
                                            >
                                                {isIncome ? "+" : "-"} {(transaction.amount / 100).toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL"
                                                    }
                                                )}
                                            </p>
                                        </div>


                                        {/* Tipo */}
                                        <div>
                                            <span
                                                className={`
                                                    inline-flex px-2.5 py-1 rounded-md text-xs font-semibold
                                                    ${isIncome ? "bg-[#10B981]/10 text-[#10B981]" : "bg-red-500/10 text-red-500"}
                                                `}
                                            >
                                                {isIncome ? "Receita" : "Despesa"}
                                            </span>
                                        </div>


                                        {/* Opções */}
                                        <div className="flex justify-end">
                                            <button
                                                className="
                                                    p-1.5 rounded-md cursor-pointer text-[#64748B]
                                                    transition-all duration-150 hover:bg-[#E2E8F0] hover:text-[#1E293B]
                                                "
                                            >
                                                <LuEllipsisVertical className="w-5 h-5" />
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    
                    <CategorySummary transactions={flatTransactions}/>
                    
                </div>
            </div>


        </div>
    )
}