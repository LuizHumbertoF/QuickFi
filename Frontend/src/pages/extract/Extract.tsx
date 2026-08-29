import { Sidebar } from "../sidebar/Sidebar"
import { useNavigate } from "react-router-dom";
import { LuClock, LuChevronDown, LuFileUp, LuLandmark, LuChevronRight} from "react-icons/lu";



export function Extract() {
    const navigate = useNavigate();

    return (

        <div className="w-screen h-screen bg-[#E2E8F0]/30 flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex flex-col p-12 gap-6">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Extrato</h1>
                        <p className="text-sm text-[#475569]">Importe extratos de suas contas para o QuickFi e mantenha tudo atualizado.</p>
                    </div>

                    <div className="flex items-center justify-center h-12 ml-auto">
                        
                        <button className="gap-2 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 flex items-center justify-center py-2 px-2 rounded-md border shadow-md border-[#E2E8F0] font-semibold">
                            <LuClock className="text-[#475569]" size={20}/>
                            <p className="text-gray-900">Histórico de Importações</p>
                            <LuChevronDown className="text-[#475569]" size={20}/>
                        </button>

                    </div>

                </div>

                <div className="flex w-full gap-4 p-3 items-center justify-center bg-white border border-[#94A3B8]/20 rounded-lg shadow-md">
                    <div className="bg-[#10B981] rounded-full w-8 h-8 shadow-lg flex items-center justify-center text-white">1</div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-900 text-sm font-semibold">Upload do arquivo</h3>
                        <h3 className="text-gray-500 text-sm ">Selecione seu extrato</h3>
                    </div>
                    <div className="bg-gray-300 w-55 h-0.5 shadow-md"/>

                    <div className="bg-[#10B981] rounded-full w-8 h-8 shadow-lg flex items-center justify-center text-white">2</div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-900 text-sm font-semibold">Revisão dos dados</h3>
                        <h3 className="text-gray-500 text-sm ">Confira e ajuste as informações</h3>
                    </div>
                    <div className="bg-gray-300 w-55 h-0.5 shadow-md"/>

                    <div className="bg-[#10B981] rounded-full w-8 h-8 shadow-lg flex items-center justify-center text-white">3</div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-900 text-sm font-semibold">Importação</h3>
                        <h3 className="text-gray-500 text-sm ">Finalize a importação</h3>
                    </div>
                </div>

                <div className="flex w-full h-full gap-4">
                    <div className="p-3 gap-3 flex h-full flex-col w-1/2 bg-white border border-[#94A3B8]/20 rounded-lg shadow-md">
                        <div className="cursor-pointer transition-all duration-200 hover:-translate-y-px p-4 gap-3 flex flex-col items-center justify-center bg-gray-400/10 h-3/5 w-full rounded-lg shadow border border-[#94A3B8]/20">
                            <LuFileUp className="text-[#10B981]" size={35}/>
                            <div className="flex flex-col">
                                <h3 className="text-gray-900 font-semibold">Arraste seu extrato aqui</h3>
                                <h3 className="text-gray-900 font-semibold">ou clique para selecionar</h3>
                            </div>
                            
                            <div className="flex items-center justify-center text-sm gap-1">
                                <h3 className="text-gray-500 font-semibold">Formatos aceitos:</h3>
                                <h3 className="text-[#10B981] font-semibold">CSV, OFX, XLSX, PDF</h3>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-6">
                            <div className="bg-gray-200/80 w-full h-0.5 shadow-md" />
                            <h3 className="text-gray-500 font-semibold text-sm">ou</h3>
                            <div className="bg-gray-200/80 w-full h-0.5 shadow-md" />
                        </div>

                        <div className="cursor-pointer transition-all duration-200 hover:-translate-y-px p-8 gap-4 flex items-center bg-white flex-1 w-full rounded-lg shadow border border-[#94A3B8]/20">
                            <LuLandmark className="text-gray-900" size={30}/>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-gray-900 font-semibold text-sm">Importe automaticamente sua conta</h3>
                                <h3 className="text-gray-500 text-sm ">Conectar via Open Finance</h3>
                            </div>
                            <LuChevronRight className="text-gray-500 ml-auto" size={30}/>
                        </div>
                    </div>

                    <div className="p-3 flex h-full flex-col w-1/2 bg-white border border-[#94A3B8]/20 rounded-lg shadow-md">
                        
                    </div>
                </div>
            
            </div>

        </div>
    )
}