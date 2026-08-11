import { BasicLogoText } from "@/assets/BasicLogoText"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLogin } from "@/controllers/fetchLogin";
import { useAuth } from "@/contexts/authContext";

const fetchLogin = new FetchLogin();

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmitLogin(event: any) {
        event.preventDefault();

        const response = await fetchLogin.execute(email, password);

        if(response.status == 201) {

            login(response.data.access_token, 
                response.data.payload.email, 
                response.data.payload.sub, 
                response.data.payload.name, 
                response.data.payload.surname
            );

            navigate("/dashboard");

        }
    }

    return(
        <div className="w-screen h-screen bg-white">
            <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
                <BasicLogoText/>

                <div className="flex flex-col gap-1 items-center justify-center">
                    <h1 className="font-semibold text-2xl">Entrar na sua conta</h1>
                    <h2 className="text-sm text-gray-600">Digite suas credenciais para continuar</h2>
                </div>

                <form 
                    className="gap-6 flex flex-col justify-center items-center"
                    onSubmit={handleSubmitLogin}
                >
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

                    <div className="w-92 flex justify-start">
                        <button className="transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-sm cursor-pointer font-semibold text-[#10B981]">
                            Esqueceu a senha?
                        </button>
                    </div>

                    <button className='transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 bg-[#10B981] py-3 px-30 cursor-pointer shadow-md text-white rounded-lg'
                        type="submit"
                    >
                        Acessar minha conta
                    </button>

                    <div className="w-92 gap-1 text-sm flex justify-center">
                        <p className="text-gray-600">Novo no QuickFi?</p>
                        <button 
                            className="transition-all duration-300 hover:-translate-y-1 active:translate-y-0 text-sm cursor-pointer font-semibold text-[#10B981]"
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Criar conta gratuita
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}