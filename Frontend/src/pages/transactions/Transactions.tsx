import { Sidebar } from "../sidebar/Sidebar"
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function Transactions() {
    const navigate = useNavigate();

    return (

        <div className="w-screen h-screen bg-white flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex p-12">
                
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
            </div>

        </div>
    )
}