import { Sidebar } from "../sidebar/Sidebar"
import { MdAdd } from "react-icons/md";
import { LuArrowLeftRight  } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LuPiggyBank, LuCircleUserRound, LuCircleDollarSign, LuEllipsisVertical  } from "react-icons/lu";
import { GetUserAccounts } from "@/controllers/getUserAccounts";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";

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

export function Accounts() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [totalAccounts, setTotalAccounts ] = useState<number>(0);
    const [ totalAmount, setTotalAmount ] = useState<number>(0);
    const [ totalActiveAccounts, setTotalActiveAccounts ] = useState<number>(0);
    const [ greatestAmount, setGreatestAmount ] = useState<greatestAmount>({number: 0, name: ""});
    const { token } = useAuth();


    console.log("token accounts:", token);

    useEffect(() => {
        if (!token) return;

        const loadAccounts = async () => {
            const response = await getUserAccounts.execute(token);
            setAccounts(response.data);
        };

        const loadAccountNumbers = () => {

            let totalAmountLocal = 0;
            let greatestAmountLocal = {
                number: 0,
                name: ""
            };
            let totalActiveAccountsLocal = 0;
            let totalAccountsLocal = 0;

            accounts.map((account) => {
                totalAccountsLocal += 1;
                totalAmountLocal += account.amount;
                
                if(account.amount > greatestAmountLocal.number) {
                    greatestAmountLocal.number = account.amount;
                    greatestAmountLocal.name = account.name;
                }
                if(account.active) {
                    totalActiveAccountsLocal += 1;
                }
                
            })

            setTotalAmount(totalAmountLocal);
            setGreatestAmount(greatestAmountLocal);
            setTotalActiveAccounts(totalActiveAccountsLocal);
            setTotalAccounts(totalAccountsLocal);

        }

        loadAccounts();
        loadAccountNumbers();

    }, [token, accounts]);

    return (

        <div className="w-screen h-screen bg-white flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex flex-col p-12 gap-6">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Contas</h1>
                        <p className="text-sm text-[#475569]">Gerencie suas contas e acompanhe seus saldos.</p>
                    </div>

                    <div className="flex items-center justify-center h-12 ml-auto">
                        
                        <button className="cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md border shadow-xs border-[#E2E8F0] font-semibold">
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
                        <div className="bg-gray-200/10 border rounded-lg shadow-xs border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-[#10B981]/10 rounded-md w-1/2 h-1/2">
                                    <LuPiggyBank className="text-[#10B981] h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Saldo total</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{(totalAmount / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                                <p className="text-sm font-semibold text-[#8f949c]">em todas as contas</p>
                            </div>
                        </div>

                        <div className="bg-gray-200/10 border rounded-lg shadow-xs border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-purple-600/10 rounded-md w-1/2 h-1/2">
                                    <LuCircleUserRound className="text-purple-600 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Contas ativas</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{totalActiveAccounts}</h3>
                                <p className="text-sm font-semibold text-[#8f949c]">de {totalAccounts}</p>
                            </div>
                        </div>

                        <div className="bg-gray-200/10 border rounded-lg shadow-xs border-[#94A3B8]/20 w-1/4 flex py-3">
                            <div className="w-1/3 h-full flex justify-center">
                                <div className="flex items-center justify-center bg-yellow-500/10 rounded-md w-1/2 h-1/2">
                                    <LuCircleDollarSign className="text-yellow-500 h-6 w-6"/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-[#7b8491]">Maior saldo</p>
                                <h3 className="text-gray-800 font-bold text-2xl">{(greatestAmount.number / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </h3>
                                <p className="text-sm font-semibold text-[#8f949c]">{greatestAmount.name}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex-col w-233.5 h-80 p-6 bg-gray-200/10 border rounded-lg shadow-md border-[#94A3B8]/20">
                    <div className="flex w-full">
                        <p className="text-sm font-semibold text-[#7b8491]">Conta</p>
                        <p className="ml-auto mr-60 text-sm font-semibold text-[#7b8491]">Saldo</p>
                    </div>

                    <div className="flex py-6 gap-6 flex-col w-full h-full overflow-y-auto">

                        {
                            accounts.map((account) => (

                                <div className="flex w-full items-center gap-6">
                                    <div className={`bg-${account.color}-500 w-6 h-6 rounded-md`}/>
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