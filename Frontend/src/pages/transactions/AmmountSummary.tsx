import { LuTrendingUp, LuTrendingDown, LuPiggyBank, LuBriefcase } from "react-icons/lu"
import { FaLightbulb } from "react-icons/fa"
import { useTransactions } from "@/contexts/transactionsContext"
import { useAccounts } from "@/contexts/accountsContext"

interface AmmountSummaryProps {
    locatedAt: string;
}

export function AmmountSummary({ locatedAt }: AmmountSummaryProps) {

    const { 
        incomes,
        expenses,
        positiveAmount,
        totalAmount,
    } = useTransactions();

    const { accountNumbers } = useAccounts();


    switch(locatedAt) { 
        case "transactions":
            return (
                        <div className="flex w-full h-full gap-5">
                            <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                                <div className="w-1/3 h-full flex justify-center">
                                    <div className="flex items-center justify-center bg-[#10B981]/10 rounded-md shadow-md w-1/2 h-1/2">
                                        <LuTrendingUp className="text-[#10B981] h-6 w-6"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-[#1E293B]">Receitas</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(incomes / 100).toLocaleString("pt-BR", {
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
                                    <p className="text-sm font-semibold text-[#1E293B]">Despesas</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(expenses / 100).toLocaleString("pt-BR", {
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
                                    <p className="text-sm font-semibold text-[#1E293B]">Total do período</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(totalAmount / 100).toLocaleString("pt-BR", {
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

            );
        case "dashboard":
            return (
                        <div className="flex w-full h-full gap-5">
                            <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                                <div className="w-1/3 h-full flex justify-center">
                                    <div className="flex items-center justify-center bg-[#10B981]/10 rounded-md shadow-md w-1/2 h-1/2">
                                        <LuPiggyBank className="text-[#10B981] h-6 w-6"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                     <p className="text-sm font-semibold text-[#1E293B]">Saldo total</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(accountNumbers.totalAmount / 100).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </h3>
                                    <p className="text-sm font-semibold text-[#8f949c]">em todas as contas</p>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                                <div className="w-1/3 h-full flex justify-center">
                                    <div className="flex items-center justify-center bg-[#10B981]/10 rounded-md shadow-md w-1/2 h-1/2">
                                        <LuTrendingUp className="text-[#10B981] h-6 w-6"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-[#1E293B]">Receitas</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(incomes / 100).toLocaleString("pt-BR", {
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
                                    <p className="text-sm font-semibold text-[#1E293B]">Despesas</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(expenses / 100).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </h3>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                                <div className="w-1/3 h-full flex justify-center">
                                    <div className="flex items-center justify-center bg-yellow-500/10 rounded-md shadow-md w-1/2 h-1/2">
                                        <LuBriefcase className="text-yellow-500 h-6 w-6"/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-[#1E293B]">Total do período</p>
                                    <h3 className="text-[#1E293B] font-bold text-2xl">{(totalAmount / 100).toLocaleString("pt-BR", {
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

                        </div>

            );
        
    }
}