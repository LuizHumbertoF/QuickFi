import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar/Sidebar"
import { useAuth } from "@/contexts/authContext";
import { AmmountSummary } from "../transactions/AmmountSummary";
import { CategorySummary } from "../transactions/CategorySummary";
import { useTransactions } from "@/contexts/transactionsContext";
import { BalanceEvolution } from "../accounts/BalanceEvolution";


export function Dashboard() {
    
    const { userName } = useAuth();
    const { flatTransactions } = useTransactions();
    
    return(
        <div className="w-screen h-screen bg-[#E2E8F0]/30 flex">
            
            <Sidebar/>
            
            <div className="w-full h-full flex flex-col p-12 gap-6">
                
                <div className="flex w-full h-16.25 items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Olá, {userName}! 👋</h1>
                        <p className="text-base text-[#475569]">Seu resumo financeiro está atualizado hoje.</p>
                    </div>

                    
                </div>

                <div className="flex w-full h-32 ">
                    <AmmountSummary locatedAt="dashboard"/>
                </div>

                <div className="flex">
                    <BalanceEvolution/>
                    <CategorySummary transactions={flatTransactions}/>
                </div>
                
            </div>



        </div>
    )
}