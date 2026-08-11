import axios from "axios";

export class FetchLogin {
    async execute(email: string, password: string) {
        
        try {
            const data = {
                email: email,
                password: password
            };

            const response = await axios.post("http://localhost:3000/auth/login", data);

            return response;
        }
        catch(e) {
            console.log("Erro ao registrar usuario: ", e);

            throw e;
        }
    }
}