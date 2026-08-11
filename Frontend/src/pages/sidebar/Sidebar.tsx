import { BasicLogoText } from "@/assets/BasicLogoText"
import { FaChartPie   } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { MdOutlineCreditCard } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import MyPhotoExample from "@/assets/profissional-photo.jpeg"
import { useAuth } from "@/contexts/authContext";
import { LuUser, LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Sidebar() {

    const { userName, logout } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-70 h-full bg-[#0F172A]">
            <div className="pt-5 pl-5">
                <BasicLogoText
                    white={true}
                    posStart={true}
                />
            </div>

            <div className="h-full flex flex-col justify-center">
                <nav>
                    <ul className="flex flex-col pt-6 ml-3 gap-2">
                        <li>
                            <button className="cursor-pointer flex justify-start p-4 items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 h-11 rounded-md">
                                <FaChartPie size={20} className="text-[#10B981]"/>
                                <p className="text-white">Dashboard</p>
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer flex justify-start p-4 items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 h-11 rounded-md">
                                <MdOutlineDescription size={20} className="text-[#10B981]"/>
                                <p className="text-white">Extrato</p>
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer flex justify-start p-4 items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 h-11 rounded-md">
                                <MdOutlineCreditCard size={20} className="text-[#10B981]"/>
                                <p className="text-white">Cartões</p>
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer flex justify-start p-4 items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 h-11 rounded-md">
                                <MdOutlineAccountBalanceWallet size={20} className="text-[#10B981]"/>
                                <p className="text-white">Carteira</p>
                            </button>
                        </li>

                        <li>
                            <button className="cursor-pointer flex justify-start p-4 items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 h-11 rounded-md">
                                <MdOutlineSettings size={20} className="text-[#10B981]"/>
                                <p className="text-white">Configurações</p>
                            </button>
                        </li>

                    </ul>

                </nav>

                <div className="flex flex-col mt-auto">
                    {
                        showLogoutModal ? (
                            <div className="profile-menu flex flex-col mr-3 rounded-md shadow-md border border-[#94A3B8] ml-auto bg-[#E2E8F0] w-36 h-30">
                                <button 
                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer border-b border-[#94A3B8]  p-4 h-1/2 flex items-center"
                                >
                                    <LuUser/>
                                    Meu Perfil
                                </button>
                                <button 
                                    className="gap-2 transition-all duration-200 hover:bg-[#94A3B8]/40 cursor-pointer p-4 h-1/2 flex items-center"
                                    onClick={() => {
                                        logout();
                                        navigate('/login');
                                    }}
                                >
                                    <LuLogOut/>
                                    Logout
                                </button>
                            </div>
                        ) : (<></>)
                    }

                    <li className="flex justify-center items-center mb-4">
                        <button 
                            className="cursor-pointer flex justify-center items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:bg-[#94A3B8]/15 w-50 p-2 rounded-md text-white"
                            onClick={() => setShowLogoutModal(!showLogoutModal)}
                        >
                            
                            <img className="w-11 h-11 rounded-full" src={MyPhotoExample}></img>
                            
                            <div className="flex flex-col items-start">
                                <p>{userName}</p>
                                <p className="text-sm text-[#94A3B8]">Premium</p>
                            </div>
                        </button>
                    </li>
                </div>
            </div>

        </div>
    )
}