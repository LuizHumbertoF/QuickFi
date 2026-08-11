import { useState } from "react";
import { BasicLogoText } from "@/assets/BasicLogoText";
import { useNavigate } from "react-router-dom";
import { FetchRegisterUser } from "@/controllers/fetchRegisterUser";


const fetchRegisterUser = new FetchRegisterUser();

export function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: any) {
        event.preventDefault();
        const response = await fetchRegisterUser.execute(name, email, password);

        if(response.data.access_token) {
            await localStorage.setItem("token", response.data.access_token);
            
            console.log("Usuario registrado com sucesso!");
            alert("Usuario registrado com sucesso!");
            navigate("/dashboard");
        }

    }

    return (
        <div className="w-screen h-screen bg-white">
            <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
                <BasicLogoText/>

                <div className="flex flex-col gap-1 items-center justify-center">
                    <h1 className="font-semibold text-2xl">Criar Conta</h1>
                    <h2 className="text-sm text-gray-600">Preencha seus dados para começar</h2>
                </div>

                <form 
                    className="gap-6 flex flex-col justify-center items-center"
                    onSubmit={handleSubmit}
                >

                    <div className="w-92 gap-1 flex flex-col justify-start">
                        <p className="text-gray-600 font-semibold text-sm">Nome completo</p>
                        <input
                            className="w-full border border-gray-200 p-2 rounded-md" 
                            type="text"
                            name="name"
                            placeholder="Digite seu nome..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="w-92 gap-1 flex flex-col justify-start">
                        <p className="text-gray-600 font-semibold text-sm">E-mail</p>
                        <input
                            className="w-full border border-gray-200 p-2 rounded-md" 
                            type="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="w-92 gap-1 flex flex-col justify-start">
                        <p className="text-gray-600 font-semibold text-sm">Senha</p>
                        <input
                            className="w-full border border-gray-200 p-2 rounded-md" 
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>


                    <button className='transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 bg-[#10B981] py-3 px-30 cursor-pointer shadow-md text-white rounded-lg'
                        type="submit"
                    >
                        Acessar minha conta
                    </button>

                    <div className="w-92 gap-1 text-sm flex justify-center">
                        <p className="text-gray-600">Já tem uma conta?</p>
                        <button 
                            className="transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-sm cursor-pointer font-semibold text-[#10B981]"
                            type="button"
                            onClick={() => navigate("/login")}
                        >
                            Fazer Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}