    import axios from "axios";

    export class PostUserTransaction {
        async execute(token: string, 
            amount: number, 
            transactionDescription: string, 
            transactionDate: string, 
            transactionCategory: string, 
            chosenAccount: string, 
            transactionType: string,
            paymentType: string | undefined,
            recurrentTransaction: boolean
        ) {
            
            try {
                const data = {
                    amount: amount,
                    type: transactionType,
                    category: transactionCategory,
                    account: chosenAccount,
                    description: transactionDescription,
                    transactionDate: transactionDate,
                    recurrent: recurrentTransaction,

                    ...(paymentType && {
                        paymentType: paymentType
                    })
                };
    
                const response = await axios.post("http://localhost:3000/transactions/newTransaction", data, {
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