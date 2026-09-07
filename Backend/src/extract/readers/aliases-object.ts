export const columnAliases = {
    date: [
        /(?:^|[\s_])data(?:[\s_]|$)/, 
        /(?:^|[\s_])date(?:[\s_]|$)/,
        /(?:^|[\s_])dia(?:[\s_]|$)/,
        /(?:^|[\s_])lancamento(?:[\s_]|$)/
    ],

    description: [
        /(?:^|[\s_])descricao(?:[\s_]|$)/,
        /(?:^|[\s_])historico(?:[\s_]|$)/,
        /(?:^|[\s_])description(?:[\s_]|$)/,
        /(?:^|[\s_])detalhe(?:[\s_]|$)/,
        /(?:^|[\s_])movimentacao(?:[\s_]|$)/,
        /(?:^|[\s_])docto(?:[\s_]|$)/,
        /(?:^|[\s_])documento(?:[\s_]|$)/,
        /(?:^|[\s_])origem(?:[\s_]|$)/
    ],

    balance: [ 
        /(?:^|[\s_])saldo(?:[\s_]|$)/,
        /(?:^|[\s_])balance(?:[\s_]|$)/
    ]
};

export const transactionCategories = {
    salario: [
        /salario/, /ordenado/, /adiantamento/, /folha de pgto/, /proventos/, 
        /remuneracao/, /pagto salario/, /holerite/, /vencimento/
    ],

    trabalho: [
        /honorarios/, /servicos prestados/, /\bmei\b/, /nota fiscal/, /\bnf\b/, 
        /freelance/, /freela/, /\bpj\b/, /consultoria/
    ],

    investimentos: [
        /\bxp\b/, /rico/, /clear/, /\bbtg\b/, /nuinvest/, /\bb3\b/, /tesouro direto/, 
        /\bcdb\b/, /\bcdi\b/, /acoes/, /\bfii\b/, /dividendo/, /\bjcp\b/, /rendimento/, 
        /corretora/, /poupanca/, /aplicacao/, /resgate/
    ],

    moradia: [
        /aluguel/, /condominio/, /energia/, /\bluz\b/, /agua/, /\bgas\b/, 
        /enel/, /cemig/, /copel/, /light/, /sabesp/, /copasa/, /sanepar/, 
        /iptu/, /internet/, /\bvivo\b/, /claro/, /\btim\b/, /\boi\b/, /prestacao hab/, 
        /financiamento imob/
    ],

    alimentacao: [
        /ifood/, /rappi/, /uber eats/, /ze delivery/, /restaurante/, 
        /padaria/, /supermercado/, /mercado/, /atacadao/, /carrefour/, 
        /extra/, /pao de acucar/, /mcdonalds/, /mc donalds/, /burger king/, 
        /\bbk\b/, /lanche/, /lanchonete/, /\bbar\b/, /hortifruti/, /acougue/, 
        /confeitaria/, /sorveteria/, /assai/, /sams club/
    ],

    transporte: [
        /uber/, /\b99\b/, /99pop/, /99taxi/, /indrive/, /cabify/, 
        /posto/, /ipiranga/, /shell/, /petrobras/, /\bale\b/, /combustivel/, 
        /estacionamento/, /sem parar/, /conectcar/, /veloe/, /taggy/, 
        /bilhete unico/, /metro/, /cptm/, /onibus/, /passagem/, 
        /azul/, /\bgol\b/, /latam/, /\bvoe\b/, /pedagio/
    ],

    lazer: [
        /netflix/, /spotify/, /amazon prime/, /disney/, /\bhbo\b/, 
        /cinema/, /teatro/, /show/, /ingresso/, /sympla/, /eventim/, 
        /xbox/, /playstation/, /steam/, /nintendo/, /viagem/, /hotel/, 
        /airbnb/, /booking/, /\bcvc\b/, /clube/, /barzinho/
    ],

    compras: [
        /amazon/, /mercado livre/, /mercadolivre/, /shopee/, /aliexpress/, 
        /shein/, /magalu/, /magazine luiza/, /americanas/, /casas bahia/, 
        /farmacia/, /drogasil/, /pague menos/, /drogaria/, /sao paulo/, 
        /renner/, /riachuelo/, /zara/, /c&a/, /\bcea\b/, /centauro/, /netshoes/, 
        /petz/, /cobasi/, /papelaria/, /vestuario/, /loja/
    ],

    outro: [
        /tarifa/, /taxa/, /anuidade/, /\biof\b/, /juros/, /multa/, 
        /saque/, /banco24h/, /\bted\b/, /\bdoc\b/, /\bpix\b/, /pagto conta/, 
        /pagamento de titulo/, /boleto/, /mensalidade/, /emprestimo/, 
        /consignado/, /seguro/, /doacao/
    ]
};