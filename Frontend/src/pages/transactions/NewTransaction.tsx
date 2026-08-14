import { Sidebar } from "../sidebar/Sidebar"
import { LuCircleHelp } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuTrendingUp } from "react-icons/lu";
import { LuTrendingDown } from "react-icons/lu";
import { LuChevronDown } from "react-icons/lu";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { MdOutlineCreditCard } from "react-icons/md";
import { LuCalendar } from "react-icons/lu";
import { LuSparkles   } from "react-icons/lu";
import { LuTags } from "react-icons/lu";
import { LuBriefcaseBusiness, LuBadgeDollarSign, LuChartNoAxesCombined, LuHouse, LuUtensils, LuCar, LuGamepad2, LuShoppingBag, LuEllipsis  } from "react-icons/lu";
import type { Account } from "../accounts/Accounts";
import { useAuth } from "@/contexts/authContext";
import { GetUserAccounts } from "@/controllers/getUserAccounts";
import { PostUserTransaction } from "@/controllers/postUserTransaction";

const getUserAccounts = new GetUserAccounts();
const postUserTransaction = new PostUserTransaction();

export function NewTransaction() {
    const MAX_AMOUNT = 9999999; // R$ 99.999,99 em centavos

    const [recurrentTransaction, setRecurrentTransaction] = useState(false);
    const [transactionType, setTransactionType] = useState<"receita" | "despesa" | undefined>(undefined);
    const [amount, setAmount] = useState<number>(0);
    const [ transactionDescription, setTransactionDescription ] = useState<string>("");
    const [ transactionDate, setTransactionDate ] = useState("");
    const [ transactionCategory, setTransactionCategory ] = useState<string>("");
    const [ openedCategoryModal, setOpenedCategoryModal ] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [chosenAccount, setChosenAccount ] = useState<string>("");
    const [ openedAccountModal, setOpenedAccountModal ] = useState<boolean>(false);
    const [ paymentType, setPaymentType ] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const { token } = useAuth();

    async function handleSaveTransaction() {

        if(!amount 
            || !transactionDescription 
            || !transactionDate  
            || !transactionCategory 
            || !transactionType 
            || !chosenAccount
        ) {

            alert("Campos obrigatórios inválidos.");
            return;
        }

        if(token) {

            const response = await postUserTransaction.execute(token, 
                amount, 
                transactionDescription,
                transactionDate,
                transactionCategory,
                chosenAccount,
                transactionType,
                paymentType,
                recurrentTransaction
            )

            if(response.status === 201) {

                alert("Transação criada com sucesso!")

                navigate("/transactions");
            }
        }

    }

    const handleAmountChange = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        const cents = Number(numbers);

        if (cents > MAX_AMOUNT) {
            return;
        }

        setAmount(cents);
    };

    const formatDate = (date: string) => {
        if (!date) return "";

        return new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
    };

    useEffect(() => {
        if (!token) return;

        const loadAccounts = async () => {
            const response = await getUserAccounts.execute(token);
            setAccounts(response.data);
        };

        loadAccounts();

        console.log("accounts new transactions: ", accounts);

    }, [token]);

    return (

        <div className="w-screen h-screen bg-[#E2E8F0]/40 flex">
            
            
            <Sidebar/>

            <div className="fixed z-50 flex items-center ml-44 mt-2 w-25 h-12">
                <button 
                    className="cursor-pointer transition-all duration-200 hover:-translate-y-1 ml-auto mr-1"
                    onClick={() => navigate("/transactions")}
                >
                    <LuArrowLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="w-full h-full flex flex-col px-12 py-4 gap-4">

                <div className="flex w-full h-16.25 items-center">
                    
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Nova Transação</h1>
                        <p className="text-sm text-[#475569]">Adicione uma nova entrada ou saída.</p>
                    </div>

                    <div className="flex items-center justify-center h-12 ml-auto">
                        
                        <button className="bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-1 py-2 px-4 rounded-md border shadow-xs border-[#E2E8F0] text-sm font-semibold">
                            <LuCircleHelp className="text-[#475569]" size={20}/>
                            <p className="text-[#475569]">Como funciona?</p>
                        </button>

                    </div>
                </div>

                <div className="flex gap-6 h-full w-full">
                    <div className="bg-white gap-3 border flex flex-col shadow-lg border-[#E2E8F0] rounded-lg p-5 w-4/6">
                        <div className="flex mb-3">
                            <h2 className="font-semibold">Informações da transação</h2>
                            <div className="flex ml-auto gap-2">
                                <p className="text-sm text-[#626d7e] font-semibold">Transação recorrente</p>
                                <button
                                    type="button"
                                    onClick={() => setRecurrentTransaction(!recurrentTransaction)}
                                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                        recurrentTransaction ? "bg-[#10B981]" : "bg-[#CBD5E1]"
                                    }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                                            recurrentTransaction ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="gap-2 flex flex-col w-full">
                            <p className="text-sm font-semibold text-[#414f63]">Tipo de transação</p>
                            
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setTransactionType("receita")}
                                    className={`
                                        w-9/19
                                        transition-all duration-200
                                        hover:-translate-y-1
                                        hover:bg-[#94A3B8]/10
                                        hover:border-[#10B981]
                                        gap-3
                                        text-[#10B981]
                                        py-4
                                        rounded-lg
                                        font-semibold
                                        text-sm
                                        flex
                                        items-center
                                        justify-center
                                        border
                                        shadow-sm
                                        ${
                                            transactionType === "receita"
                                                ? "-translate-y-1 bg-[#94A3B8]/10 border-[#10B981]"
                                                : "border-[#E2E8F0]"
                                        }
                                    `}
                                >
                                    <LuTrendingUp />
                                    Receita
                                </button>

                                <button
                                    onClick={() => setTransactionType("despesa")}
                                    className={`
                                        w-9/19
                                        transition-all duration-200
                                        hover:-translate-y-1
                                        hover:bg-[#94A3B8]/10
                                        hover:border-red-600
                                        gap-3
                                        text-red-600
                                        py-4
                                        rounded-lg
                                        font-semibold
                                        text-sm
                                        flex
                                        items-center
                                        justify-center
                                        border
                                        shadow-sm
                                        ${
                                            transactionType === "despesa"
                                                ? "-translate-y-1 bg-[#94A3B8]/10 border-red-600"
                                                : "border-[#E2E8F0]"
                                        }
                                    `}
                                >
                                    <LuTrendingDown />
                                    Despesa
                                </button>
                            </div>
                            
                            <p className="text-sm font-semibold text-[#414f63]">Valor</p>
                            <input className="h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                placeholder="R$ 0,00"
                                value={
                                    amount
                                    ? (amount / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })
                                    : ""
                                }
                                onChange={(e) => handleAmountChange(e.target.value)}
                            />

                            <div className="flex gap-6">
                                <div className="w-3/5 flex flex-col">
                                    <p className="text-sm font-semibold text-[#414f63]">Descrição</p>
                                    <input className="h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                        placeholder="Ex: Salário, Supermercado, Uber..."
                                        type="text"
                                        value={transactionDescription}
                                        onChange={(e) => setTransactionDescription(e.target.value)}
                                    />
                                </div>

                                <div className="w-2/7 flex flex-col">
                                    <p className="text-sm font-semibold text-[#414f63]">Data</p>
                                    <input className="h-9 text-[#414f63] border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                        type="date"
                                        value={transactionDate}
                                        onChange={(e) => setTransactionDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-3/7 flex flex-col">
                                    <p className="text-sm font-semibold text-[#414f63]">Categoria</p>
                                    <button 
                                        className=" gap-3 flex items-center text-[#414f63] font-semibold text-sm h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                        onClick={() => setOpenedCategoryModal(!openedCategoryModal)}
                                    >   
                                        <LuTags className="text-purple-600 w-4.5 h-4.5"/>
                                        {transactionCategory ? transactionCategory : "Selecione uma categoria"}
                                        <div className="ml-auto">
                                            <LuChevronDown className={`transition-transform duration-200 ${
                                                openedCategoryModal ? "rotate-180" : "rotate-0"
                                            }`}/>
                                        </div>
                                    </button>
                                    {
                                        openedCategoryModal ?
                                        (
                                            <div className="fixed z-50 mt-16 flex flex-col items-center   rounded-md shadow-md border border-[#E2E8F0] bg-white w-1/5 max-h-42 overflow-y-auto">
                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 py-3 border-[#94A3B8] w-full shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Salário");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuBadgeDollarSign className="w-5 h-5 text-[#10B981]"/>
                                                    Salário
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Trabalho");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuBriefcaseBusiness className="w-5 h-5 text-[#10B981]"/>
                                                    Trabalho
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Investimentos");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuChartNoAxesCombined className="w-5 h-5 text-[#10B981]"/>
                                                    Investimentos
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Moradia");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuHouse className="w-5 h-5 text-[#10B981]"/>
                                                    Moradia
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Alimentação");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuUtensils className="w-5 h-5 text-[#10B981]"/>
                                                    Alimentação
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Transporte");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuCar className="w-5 h-5 text-[#10B981]"/>
                                                    Transporte
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Lazer");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuGamepad2 className="w-5 h-5 text-[#10B981]"/>
                                                    Lazer
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Compras");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuShoppingBag className="w-5 h-5 text-[#10B981]"/>
                                                    Compras
                                                </button>

                                                <button 
                                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer px-4 w-full py-3 shrink-0 flex items-center"
                                                    onClick={() => {
                                                        setTransactionCategory("Outro");
                                                        setOpenedCategoryModal(false);
                                                    }}
                                                >
                                                    <LuEllipsis className="w-5 h-5 text-[#10B981]"/>
                                                    Outro
                                                </button>
                                            </div>
                                        )
                                        :
                                        (<></>)
                                    }     

                                </div>

                                <div className="w-3/7 flex flex-col">
                                    <p className="text-sm font-semibold text-[#414f63]">Conta</p>
                                    <button 
                                        className=" gap-3 flex items-center text-[#414f63] font-semibold text-sm h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                        onClick={() => setOpenedAccountModal(!openedAccountModal)}
                                    >
                                        <MdOutlineAccountBalanceWallet className="text-[#10B981] w-4.5 h-4.5"/>
                                        {chosenAccount ? chosenAccount : "Selecione uma conta"}
                                        <div className="ml-auto">
                                            <LuChevronDown className={`transition-transform duration-200 ${
                                                openedAccountModal ? "rotate-180" : "rotate-0"
                                            }`}/>
                                        </div>
                                    </button>

                                    {openedAccountModal && (
                                        <div className="fixed z-50 mt-16 flex flex-col items-center rounded-md shadow-md border border-[#E2E8F0] bg-white w-1/5 max-h-42 overflow-y-auto">

                                            {accounts.map((account, index) => (
                                                <button
                                                    key={account.id}
                                                    className={`gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer px-4 py-3 w-full shrink-0 flex items-center
                                                        ${index !== accounts.length - 1 ? "border-b border-[#94A3B8]" : ""}`}
                                                    onClick={() => {
                                                        setChosenAccount(account.name);
                                                        setOpenedAccountModal(false);
                                                    }}
                                                >
                                                    <div
                                                        className={`w-3 h-3 rounded-md bg-${account.color}-500`}
                                                    />

                                                    {account.name}
                                                </button>
                                            ))}

                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-1">
                                <p className="text-sm font-semibold text-[#414f63]">Forma de pagamento</p>
                                <p className="text-sm font-semibold text-[#767f8a]">(Opcional)</p>
                            </div>
                            <button 
                                className=" gap-3 flex items-center text-[#414f63] font-semibold text-sm h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                            >
                                <MdOutlineCreditCard className="text-blue-500 w-4.5 h-4.5"/>
                                Selecione a forma de pagamento
                                <div className="ml-auto">
                                    <LuChevronDown/>
                                </div>
                            </button>

                            <div className="mt-3 gap-5 ml-auto flex items-center justify-center">
                                <button className="cursor-pointer hover:bg-[#94A3B8]/10 transition-all duration-200 hover:-translate-y-1 py-2 px-6 border shadow-xs text-[#414f63] rounded-lg font-semibold border-[#E2E8F0]">
                                    Cancelar
                                </button>

                                <button 
                                    className="cursor-pointer transition-all duration-200 hover:-translate-y-1 bg-[#10B981] py-2 px-6 text-white rounded-lg shadow-md"
                                    onClick={() => handleSaveTransaction()}
                                >
                                    Salvar transação
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-2/6 gap-2">
                        {
                            transactionType ?
                                (
                                    transactionType === "receita" ?
                                        (
                                            <div className=" bg-white border shadow-lg border-[#E2E8F0] gap-7 rounded-lg p-6 flex flex-col ">
                                                <h3 className="font-semibold">Resumo da transação</h3>

                                                <div className="mt-2 flex flex-col items-center">
                                                    <div className="text-[#10B981] mb-5 w-14 h-14 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                                                        <LuTrendingUp className="w-5 h-5"/>
                                                    </div>

                                                    <p className="text-[#10B981] font-bold">Receita</p>

                                                    <h3 className="text-[#10B981] font-bold text-2xl">{(amount / 100).toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </h3>
                                                </div>

                                                <div className="flex gap-2">
                                                    <LuCalendar className="text-[#414f63] w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Data</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{formatDate(transactionDate)}</p>

                                                </div>

                                                <div className="flex gap-2">
                                                    <LuTags className="text-purple-600 w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Categoria</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{transactionCategory}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <MdOutlineAccountBalanceWallet className="text-[#10B981] w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Conta</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{chosenAccount}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <MdOutlineCreditCard className="text-blue-500 w-4.5 h-4.5" />
                                                    <p className="text-sm font-semibold text-[#414f63]">Forma de pagamento</p>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="bg-white border shadow-lg border-[#E2E8F0] gap-7 rounded-lg p-6 flex flex-col">
                                                <h3 className="font-semibold">Resumo da despesa</h3>

                                                <div className="mt-2 flex flex-col items-center">
                                                    <div className="text-red-600 mb-5 w-14 h-14 rounded-full bg-red-600/20 flex items-center justify-center">
                                                        <LuTrendingDown className="w-5 h-5"/>
                                                    </div>

                                                    <p className="text-red-500 font-bold">Despesa</p>

                                                    <h3 className="text-red-500 font-bold text-2xl">{(amount / 100).toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </h3>
                                                </div>

                                                <div className="flex gap-2">
                                                    <LuCalendar className="text-[#414f63] w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Data</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{formatDate(transactionDate)}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <LuTags className="text-purple-600 w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Categoria</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{transactionCategory}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <MdOutlineAccountBalanceWallet className="text-[#10B981] w-4.5 h-4.5"/>
                                                    <p className="text-sm font-semibold text-[#414f63]">Conta</p>
                                                    <p className="text-sm font-semibold text-[#414f63] ml-auto">{chosenAccount}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <MdOutlineCreditCard className="text-blue-500 w-4.5 h-4.5" />
                                                    <p className="text-sm font-semibold text-[#414f63]">Forma de pagamento</p>
                                                </div>
                                            </div>
                                        )
                                )
                            :
                            (<></>)

                        }

                        
                        <div className="border border-[#10B981]/20 bg-white rounded-lg shadow-lg">
                            <div className="bg-[#10B981]/10 flex justify-center rounded-lg gap-3 p-3">

                                <LuSparkles className="w-10 h-10 text-[#10B981]"/>
                                <div className="flex flex-col p-1">
                                    <h5 className="font-semibold">Dica QuickFi</h5>
                                    <p className="text-[#414f63] text-sm">Adicionar categorias e formas de pagamento ajuda você a ter um controle financeiro mais completo!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>

    )
}