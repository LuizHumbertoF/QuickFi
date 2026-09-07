import { parse } from "csv-parse/sync";
import { columnAliases, transactionCategories } from "./aliases-object.js";

export interface ImportTransaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: string;
  paymentType?: string;
  sugestedCategory: string;
}

export function csvReader(content: any) {
    const records = parse(content, {
        columns: (header) => header.map(column => {
            const newColumn = column.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return newColumn;
        }),
        delimiter: ';', // Define o separador correto para o padrão brasileiro
        from_line: 2,   // Pula a linha 1 (título do extrato). Aumente se o cabeçalho real estiver na linha 3 ou 4.
        skip_empty_lines: true, // Ignora linhas em branco
        trim: true, // Remove espaços sobrando no início e fim dos textos
        relax_column_count: true // Evita quebrar se o banco mandar alguma linha com colunas a mais/menos
    });
    
    const transactions: ImportTransaction[] = [];

    records.forEach((transaction: any) => {
        const keys = Object.keys(transaction);
        console.log("keys: ", keys);

        const localTransaction: ImportTransaction = {
            date: "",
            description: "",
            amount: 0,
            type: "",
            balance: 0,
            sugestedCategory: ""
        } 

        columnAliases.date.forEach(param => {

            if (param instanceof RegExp) {
                //console.log("passou aqui");

                for(const key of keys) {
                    if(param.test(key)) {
                        //console.log("entrei na parte de data");
                        
                        const rawDate = transaction[key]; // Exemplo: "10/08/2026"

                        if (rawDate && rawDate.includes('/')) {
                            // Separa o dia, mês e ano usando a barra
                            const [dia, mes, ano] = rawDate.split('/');
                            
                            // Remonta no padrão ISO: "2026-08-10"
                            localTransaction.date = `${ano}-${mes}-${dia}`;
                        } else {
                            // Fallback caso a data já venha formatada de outro jeito
                            localTransaction.date = rawDate; 
                        }
    
                    }
                }
            }    
        });

        columnAliases.balance.forEach(param => {

            if (param instanceof RegExp) {
                for(const key of keys) {
                    if(param.test(key)) {
                        //console.log("entrei na parte de total amount");
                        const formattedNumber = transaction[key].replace(/\./g, "").replace(/,/g, ".");
                        const balance = Number(formattedNumber);
                        localTransaction.balance = balance;
                        return
                    }
                }
            }    
        });

        columnAliases.description.forEach(param => {

            if (param instanceof RegExp) {
                for(const key of keys) {
                    if(param.test(key)) {
                        //console.log("entrei na parte de descricao");
                        localTransaction.description = transaction[key].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");;
                        break;
                    }
                }
            }
            
            if(localTransaction.description) {
                const transactionCategoriesKeys = Object.keys(transactionCategories);

                transactionCategoriesKeys.forEach((key: string) => {
                    const keyName = key as keyof typeof transactionCategories;
                    
                    transactionCategories[keyName].forEach(regex => {
                        
                        if(regex.test(localTransaction.description)) {

                            localTransaction.sugestedCategory = keyName;

                            return;
                        }
                    });
                });
            }

            if(!localTransaction.sugestedCategory) {
                localTransaction.sugestedCategory = "outro";
            }

        });

        keys.forEach((key) => {
            if((/(?:^|[\s_])credito(?:[\s_]|$)/.test(key) || /(?:^|[\s_])entrada(?:[\s_]|$)/.test(key)) && transaction[key] !== "") {
                //console.log("entrei na parte de credito");
                localTransaction.type = "credito";
                
                const formattedNumber = transaction[key].replace(/\./g, "").replace(/,/g, ".");
                const credito = Number(formattedNumber);
                localTransaction.amount = credito;
                return;
            }
            else if((/(?:^|[\s_])debito(?:[\s_]|$)/.test(key) || /(?:^|[\s_])saida(?:[\s_]|$)/.test(key)) && transaction[key] !== "") {
                //console.log("entrei na parte de debito");
                localTransaction.type = "debito";
                
                const formattedNumber = transaction[key].replace(/\./g, "").replace(/,/g, ".");
                const debito = Number(formattedNumber);
                localTransaction.amount = debito;
                return;
            }
        });

        transactions.push(localTransaction);
    });

    console.log("parsed csv: ", records);
    console.log("import transactions: ", transactions);

    return transactions;
}