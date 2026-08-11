import axios from "axios";

export class FetchRegisterUser {
    async execute(name: string, email: string, password: string) {
        
        try {
            const data = {
                name: name,
                email: email,
                password: password
            };

            const response = await axios.post("http://localhost:3000/auth/register", data);

            return response;
        }
        catch(e) {
            console.log("Erro ao registrar usuario: ", e);

            throw e;
        }
    }
}