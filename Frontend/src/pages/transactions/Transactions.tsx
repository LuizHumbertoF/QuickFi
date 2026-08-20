import { Sidebar } from "../sidebar/Sidebar"
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
    LuArrowDown,
    LuArrowUp,
    LuEllipsisVertical
} from "react-icons/lu";
import { CategorySummary } from "./CategorySummary";
import { useTransactions } from "@/contexts/transactionsContext";
import { AmmountSummary } from "./AmmountSummary";

export function Transactions() {
    
    const navigate = useNavigate();
    const { flatTransactions } = useTransactions();

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
                    
                    <AmmountSummary locatedAt="transactions"/>                    

                </div>
                <div className="flex w-full h-full ">
                    <div className="flex flex-col w-5/7 h-80 bg-white border rounded-lg shadow-lg border-[#94A3B8]/20 overflow-hidden">

                        {/* Cabeçalho */}
                        <div className="grid grid-cols-[80px_2fr_1.5fr_1.5fr_120px_100px_40px] gap-4 w-full items-center px-4 py-4 border-b border-[#94A3B8]/20 shrink-0">
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Data
                            </p>
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Descrição
                            </p>
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Categoria
                            </p>
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Conta
                            </p>
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Valor
                            </p>
                            <p className="text-xs font-semibold text-[#1E293B]">
                                Tipo
                            </p>
                            {/* Div vazia para alinhar com o botão de Opções */}
                            <div></div>
                        </div>


                        {/* Transações */}
                        <div className="flex flex-col w-full overflow-y-auto">

                            {flatTransactions.map((transaction: any, index: any) => {

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