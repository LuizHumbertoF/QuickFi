import axios from "axios";
import { data } from "react-router-dom";

export class PostUserExtract {

    async execute(token: string, file: File) {

        try {
            const formData = new FormData();

            formData.append("file", file);

            const response = await axios.post("http://localhost:3000/extract/publishExtract", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response;
        }
        catch(e) {
            console.log("Erro ao publicar extrato: ", e);

            throw e;
        }
    }
}