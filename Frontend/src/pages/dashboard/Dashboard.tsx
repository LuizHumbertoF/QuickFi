import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar/Sidebar"
import { MdOutlineSearch } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { useAuth } from "@/contexts/authContext";


export function Dashboard() {
    
    const { token, userName } = useAuth();
    console.log("userName: ", userName);
    
    return(
        <div className="w-screen h-screen bg-white flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex p-12">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Olá, {userName}! 👋</h1>
                        <p className="text-base text-[#475569]">Seu resumo financeiro está atualizado hoje.</p>
                    </div>

                    
                </div>
            </div>

        </div>
    )
}