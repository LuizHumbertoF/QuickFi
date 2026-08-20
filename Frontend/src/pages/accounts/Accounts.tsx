import { Sidebar } from "../sidebar/Sidebar"
import { MdAdd } from "react-icons/md";
import { LuArrowLeftRight  } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LuPiggyBank, LuCircleUserRound, LuCircleDollarSign, LuEllipsisVertical  } from "react-icons/lu";
import { useAccounts } from "@/contexts/accountsContext";

export interface Account {
    id: number;
    name: string;
    type: string;
    institution?: string;
    color: string;
    amount: number;
    active: boolean;
}


export function Accounts() {
    const navigate = useNavigate();
    const { accounts, accountNumbers} = useAccounts();

    return (

        <div className="w-screen h-screen bg-[#E2E8F0]/30 flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex flex-col p-12 gap-6">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Contas</h1>
                        <p className="text-sm text-[#475569]">Gerencie suas contas e acompanhe seus saldos.</p>
                    </div>

                    <div className="flex items-center justify-center h-12 ml-auto">
                        
                        <button className="bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md border shadow-lg border-[#E2E8F0] font-semibold">
                            <LuArrowLeftRight className="text-[#475569]" size={20}/>
                            <p className="text-[#475569]">Tranferência</p>
                        </button>

                        <button 
                            className="cursor-pointer p-1 transition-all duration-200 hover:-translate-y-1 bg-[#10B981] shadow-md ml-2 flex items-center justify-center gap-1 py-2 px-4 rounded-md text-white font-semibold"
                            onClick={() => navigate("newAccount")}
                        >
                            <MdAdd size={20}/>
                            <p>Nova Conta</p>
                        </button>
                    </div>

                </div>

                <div className="flex w-full h-32 ">
                    
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
                                <div className="flex items-center justify-center bg-purple-600/10 rounded-md shadow-md w-1/2 h-1/2">
                                    <LuCircleUserRound className="text-purple-600 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#1E293B]">Contas ativas</p>
                                <h3 className="text-[#1E293B] font-bold text-2xl">{accountNumbers.totalActiveAccounts}</h3>
                                <p className="text-sm font-semibold text-[#8f949c]">de {accountNumbers.totalAccounts}</p>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg shadow-md border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-yellow-500/10 rounded-md shadow-md w-1/2 h-1/2">
                                    <LuCircleDollarSign className="text-yellow-500 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#1E293B]">Maior saldo</p>
                                <h3 className="text-[#1E293B] font-bold text-2xl">{(accountNumbers.greatestAmount.number / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                                <p className="text-sm font-semibold text-[#8f949c]">{accountNumbers.greatestAmount.name}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex-col w-233.5 h-80 bg-white border rounded-lg shadow-md border-[#94A3B8]/20">
                    <div className="flex w-full border-b border-[#94A3B8]/20 items-center p-4">
                        <p className="text-sm font-semibold text-[#7b8491]">Conta</p>
                        <p className="ml-auto mr-48 text-sm font-semibold text-[#7b8491]">Saldo</p>
                    </div>

                    <div className="flex flex-col w-full h-full overflow-y-auto">

                        {
                            accounts.map((account, index) => (

                                <div className={`flex w-full items-center gap-6 p-4 
                                    ${index !== accounts.length - 1 ? "border-b border-b-[#7b8491]/20" : ""}`}>
                                    <div className={`bg-${account.color}-500 w-7 h-7 rounded-md text-white text-xs font-bold flex items-center justify-center`}>
                                        {account.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold ">{account.name}</p>
                                        <p className="ml-auto text-sm font-semibold text-[#7b8491]">Conta {account.type}</p>
                                    </div>

                                    <div className="flex ml-auto">
                                        <div className="flex-col flex mr-39">
                                            <h3 className="text-gray-800 font-bold text-sm leading-normal">{(account.amount / 100).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </h3>
                                            <p className="ml-auto text-sm font-semibold text-[#7b8491]">{account.active ? ("Ativa") : ("Inativa") }</p>
                                        </div>
                                        <button className="ml-auto cursor-pointer">
                                            <LuEllipsisVertical className="w-5 h-5"/>
                                        </button>
                                    </div>

                                </div>
                            )) 
                            
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}