import axios from "axios";

export class GetUserAccounts {

    async execute(token: string) {
        
        try {
            const response = await axios.get("http://localhost:3000/accounts", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        }
        catch(e) {
            console.log("Erro ao buscar contas do usuário: ", e);

            throw e;
        }

    }
}