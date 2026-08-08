import verified from '@/assets/verified.png'
import { BasicLogoText } from '@/assets/BasicLogoText';
import { useNavigate } from 'react-router-dom'

export function LandingPage() {
    const navigate = useNavigate();

    return(
        <div className="w-screen h-screen bg-white">
            <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
                
                <BasicLogoText/>
                
                <img src={verified} />

                <h1 className='font-bold text-3xl'>Bem-vindo ao QuickFi</h1>
                <p className='text-center w-112.5 text-gray-700'>Sua nova plataforma de finanças pessoais simplificada. Organize suas receitas, reduza despesas e atinja suas metas.</p>
            
                <button className='transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 bg-[#10B981] py-3 px-30 cursor-pointer shadow-md text-white rounded-lg'
                    onClick={() => navigate("/login")}
                >
                    Começar minha jornada
                </button>
                
                <button className='text-sm transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer text-gray-400'>
                    Dúvidas? Acesse nosso suporte
                </button>
            </div>
        </div>
    )
}