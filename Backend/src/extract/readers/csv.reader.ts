import { parse } from "csv-parse/sync";
import { columnAliases } from "./aliases-object.js";

interface ImportTransaction {
  date: string;
  description: string;
  amount: number;
  totalAmount: number;
  type: string;
  paymentType?: string;
  sugestedCategoryId?: number;
  finalCategoryId?: number;
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
            totalAmount: 0
        } 

        columnAliases.date.forEach(param => {

            if (param instanceof RegExp) {
                //console.log("passou aqui");

                for(const key of keys) {
                    if(param.test(key)) {
                        console.log("entrei na parte de data");
                        localTransaction.date = transaction[key];
                        return
                    }
                }
            }    
        });

        columnAliases.amount.forEach(param => {

            if (param instanceof RegExp) {
                for(const key of keys) {
                    if(param.test(key)) {
                        console.log("entrei na parte de total amount");
                        localTransaction.totalAmount = transaction[key];
                        return
                    }
                }
            }    
        });

        columnAliases.description.forEach(param => {

            if (param instanceof RegExp) {
                for(const key of keys) {
                    if(param.test(key)) {
                        console.log("entrei na parte de descricao");
                        localTransaction.description = transaction[key];
                        return
                    }
                }
            }    
        });

        keys.forEach((key) => {
            if(/(?:^|[\s_])credito(?:[\s_]|$)/.test(key) && transaction[key] !== "") {
                //console.log("entrei na parte de credito");
                localTransaction.type = "credito";
                
                const formattedNumber = transaction[key].replace(/\./g, "").replace(/,/g, ".");
                const credito = Number(formattedNumber);
                localTransaction.amount = credito;
                return;
            }
            else if(/(?:^|[\s_])debito(?:[\s_]|$)/.test(key) && transaction[key] !== "") {
                //console.log("entrei na parte de debito");
                localTransaction.type = "debito";
                
                const formattedNumber = transaction[key].replace(/\./g, "").replace(/,/g, ".");
                const debito = Number(formattedNumber);
                localTransaction.amount = debito;
                return;
            }
        });

        transactions.push(localTransaction);
    })

    console.log("parsed csv: ", records);
    console.log("import transactions: ", transactions);
}