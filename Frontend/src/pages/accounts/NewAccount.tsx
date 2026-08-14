import { Sidebar } from "../sidebar/Sidebar"
import { LuCircleHelp, LuBookmark, LuArrowLeft, LuLandmark, LuChevronDown, LuEllipsis, LuPiggyBank, LuWallet, LuChartNoAxesCombined, LuSmartphone, LuBadgeDollarSign } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { PostUserAccount } from "@/controllers/postUserAccount";
import { useAuth } from "@/contexts/authContext";

const postUserAccount = new PostUserAccount();

export function NewAccount() {
    const MAX_AMOUNT = 9999999; // R$ 99.999,99 em centavos

    const navigate = useNavigate();
    const [ accountName, setAccountName ] = useState<string | undefined>(undefined);
    const [ openedTypeAccount, setOpenedTypeAccount ] = useState<boolean>(false);
    const [ accountType, setAccountType ] = useState<string | undefined>(undefined);
    const [ InstitutionAccount, setInstitutionAccount ] = useState<string | undefined>(undefined);
    const [ accountColor, setAccountColor ] = useState<string | undefined>(undefined);
    const [ activeAccount, setActiveAccount ] = useState<boolean>(false);
    const [accountAmount, setAccountAmount] = useState<number | undefined>(undefined);

    const { token } = useAuth();

    const handleAmountChange = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        const cents = Number(numbers);

        if (cents > MAX_AMOUNT) {
            return;
        }

        setAccountAmount(cents);
    };

    async function handleAddAccount() {

        if(!accountName || !accountType || !accountColor || !accountAmount) {
            alert("Campos obrigatórios inválidos.");
            return;
        }

        if(token) {
            
            const response = await postUserAccount.execute(token, 
                accountName, 
                accountType, 
                accountColor, 
                accountAmount, 
                activeAccount, 
                InstitutionAccount
            );

            if(response.status === 201) {
                alert("Conta criada com sucesso!");

                navigate("/accounts");
            }


        }
    }

    return (
        <div className="w-screen h-screen bg-[#E2E8F0]/40 flex">
                    
                    
                <Sidebar/>
    
                <div className="fixed z-50 flex items-center ml-44 mt-10.25 w-25 h-12">
                    <button 
                        className="cursor-pointer transition-all duration-200 hover:-translate-y-1 ml-auto mr-1"
                        onClick={() => navigate("/accounts")}
                    >
                        <LuArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <div className="w-full h-full flex flex-col items-center pt-12"> 
                    <div className="w-full flex flex-col px-12 gap-8">
        
                        <div className="flex w-full h-16.25 items-center">
                            
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold">Adicionar nova conta</h1>
                                <p className="text-sm text-[#475569]">Preencha os dados para adicionar uma nova conta.</p>
                            </div>
        
                            <div className="flex items-center justify-center h-12 ml-auto">
                                
                                <button className="bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center gap-1 py-2 px-4 rounded-md border shadow-xs border-[#E2E8F0] text-sm font-semibold">
                                    <LuCircleHelp className="text-[#475569]" size={20}/>
                                    <p className="text-[#475569]">Como funciona?</p>
                                </button>
        
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full p-6 flex flex-col">
                        
                        <div className="bg-white shadow-md p-6 rounded-lg flex flex-col gap-6">
                            <h2 className="font-semibold">Informações da transação</h2>

                            <div className="flex w-full h-full gap-10">

                                <div className="flex flex-col w-1/2 gap-8 h-full">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#414f63]">Nome da conta</p>
                                        <input className="w-3/4 h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md bg-white"
                                            placeholder="Ex: conta principal"
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#414f63]">Tipo de conta</p>
                                        <button 
                                            className="bg-white w-2/3 gap-3 flex items-center text-[#414f63] font-semibold text-sm h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                            onClick={() => setOpenedTypeAccount(!openedTypeAccount)}
                                        >   
                                            <LuLandmark className="text-[#10B981] w-4.5 h-4.5"/>
                                            {accountType ? accountType : "Selecione uma categoria"}
                                            <div className="ml-auto">
                                                <LuChevronDown className={`transition-transform duration-200 ${
                                                    openedTypeAccount ? "rotate-180" : "rotate-0"
                                                }`}/>
                                            </div>
                                        </button>
                                        {
                                            openedTypeAccount ?
                                            (
                                                <div className="fixed w-65 z-50 mt-16 flex flex-col items-center   rounded-md shadow-md border border-[#E2E8F0] bg-white max-h-42 overflow-y-auto">
                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 py-3 border-[#94A3B8] w-full shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Corrente");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuLandmark className="w-5 h-5 text-[#10B981]"/>
                                                        Corrente
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Poupança");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuPiggyBank className="w-5 h-5 text-[#10B981]"/>
                                                        Poupança
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Carteira");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuWallet className="w-5 h-5 text-[#10B981]"/>
                                                        Carteira
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Investimento");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuChartNoAxesCombined className="w-5 h-5 text-[#10B981]"/>
                                                        Investimento
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Digital");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuSmartphone className="w-5 h-5 text-[#10B981]"/>
                                                        Digital
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Salário");
                                                            setOpenedTypeAccount(false);
                                                        }}
                                                    >
                                                        <LuBadgeDollarSign className="w-5 h-5 text-[#10B981]"/>
                                                        Salário
                                                    </button>

                                                    <button 
                                                        className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b px-4 border-[#94A3B8] w-full py-3 shrink-0 flex items-center"
                                                        onClick={() => {
                                                            setAccountType("Outro");
                                                            setOpenedTypeAccount(false);
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

                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-1">
                                            <p className="text-sm font-semibold text-[#414f63]">Instituição</p>
                                            <p className="text-sm font-semibold text-[#767f8a]">(Opcional)</p>
                                        </div>
                                        <input className="bg-white w-3/4 h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                            placeholder="Ex: Nubank, Inter, Caixa..."
                                            value={InstitutionAccount}
                                            onChange={(e) => setInstitutionAccount(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-5">
                                        <p className="text-sm font-semibold text-[#414f63]">Cor da conta</p>
                                        <div className="flex gap-8">
                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'green' ? "border-green-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button className="cursor-pointer w-full h-full rounded-full bg-green-500" 
                                                    onClick={() => setAccountColor("green")}
                                                />
                                            </div>

                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'purple' ? "border-purple-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button className="cursor-pointer w-full h-full rounded-full bg-purple-500" 
                                                    onClick={() => setAccountColor("purple")}
                                                />
                                            </div>
                                            
                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'orange' ? "border-orange-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button className="cursor-pointer w-full h-full rounded-full bg-orange-500" 
                                                    onClick={() => setAccountColor("orange")}
                                                />
                                            </div>

                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'blue' ? "border-blue-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button className="cursor-pointer w-full h-full rounded-full bg-blue-500" 
                                                    onClick={() => setAccountColor("blue")}
                                                />
                                            </div>

                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'pink' ? "border-pink-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button className="cursor-pointer w-full h-full rounded-full bg-pink-500"
                                                    onClick={() => setAccountColor("pink")}
                                                />
                                            </div>

                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'red' ? "border-red-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button 
                                                    className="cursor-pointer w-full h-full rounded-full bg-red-500"
                                                    onClick={() => setAccountColor("red")}
                                                />
                                            </div>

                                            <div className ={`transition-all duration-200 hover:-translate-y-1 flex items-center justify-center w-8 h-8 rounded-full border-2 p-0.5 ` + (
                                                accountColor === 'gray' ? "border-gray-500 animate-in zoom-in duration-300" : "border-[#E2E8F0]"
                                            )}>
                                                <button 
                                                    className="cursor-pointer w-full h-full rounded-full bg-gray-500" 
                                                    onClick={() => setAccountColor("gray")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            

                            
                                <div className="flex flex-col w-1/2 gap-8">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-semibold text-[#414f63]">Saldo inicial</p>
                                        <input className="bg-white h-9 border shadow-xs border-[#E2E8F0] p-6 rounded-md"
                                            placeholder="R$ 0,00"
                                            value={
                                                accountAmount
                                                ? (accountAmount / 100).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })
                                                : ""
                                            }
                                            onChange={(e) => handleAmountChange(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-semibold text-[#414f63]">Conta ativa</p>
                                            <p className="text-sm font-semibold text-[#747c88]">Desative para ocultar essa conta temporariamente.</p>
                                        </div>
                                        <div className="flex ml-auto mr-3 gap-2">
                                            
                                            <button
                                                type="button"
                                                onClick={() => setActiveAccount(!activeAccount)}
                                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                                    activeAccount ? "bg-[#10B981]" : "bg-[#CBD5E1]"
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                                                        activeAccount ? "translate-x-6" : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className=" border border-[#10B981]/20 bg-white rounded-lg">
                                        <div className="bg-[#10B981]/10 flex justify-center rounded-lg gap-3 p-3">
            
                                            <LuBookmark className="w-7 h-7 text-[#10B981]"/>
                                            <div className="flex flex-col p-1">
                                                <h5 className="font-semibold">Importante</h5>
                                                <p className="text-[#414f63] text-sm">As informações da sua conta são mantidas em segurança e nunca serão compartilhadas.</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-center">
                                        <div className="bg-[#414f63]/6 mt-9 rounded-lg h-15 w-79 flex items-center justify-center">
                                            <div className=" gap-5 flex items-center justify-center">
                                                <button className="cursor-pointer  transition-all duration-200 hover:-translate-y-1 py-2 px-6 border shadow-xs text-[#414f63] rounded-lg font-semibold bg-white border-[#E2E8F0]">
                                                    Cancelar
                                                </button>

                                                <button 
                                                    className="cursor-pointer transition-all duration-200 hover:-translate-y-1 bg-[#10B981] py-2 px-6 text-white rounded-lg shadow-md"
                                                    onClick={() => handleAddAccount()}
                                                >
                                                    Salvar conta
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>  
        </div>
    )
}