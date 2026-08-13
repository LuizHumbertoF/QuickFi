import axios from "axios";

export class PostUserAccount {
    async execute(token: string, name: string, type: string, color: string, amount: number, active: boolean, institution: string | undefined) {
        
        try {
            const data = {
                name: name,
                type: type,
                color: color,
                amount: amount,
                active: active,
                institution: institution
            };

            const response = await axios.post("http://localhost:3000/accounts/newAccount", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        }
        catch(e) {
            console.log("Erro ao criar conta: ", e);

            throw e;
        }
    }
}