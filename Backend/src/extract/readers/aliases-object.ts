export const columnAliases = {
    date: [
        /(?:^|[\s_])data(?:[\s_]|$)/, 
        /(?:^|[\s_])date(?:[\s_]|$)/
    ],

    description: [
        /(?:^|[\s_])descricao(?:[\s_]|$)/,
        /(?:^|[\s_])historico(?:[\s_]|$)/,
        /(?:^|[\s_])description(?:[\s_]|$)/,
    ],

    amount: [
        /(?:^|[\s_])valor(?:[\s_]|$)/,
        /(?:^|[\s_])amount(?:[\s_]|$)/,
        /(?:^|[\s_])value(?:[\s_]|$)/,
        /(?:^|[\s_])saldo(?:[\s_]|$)/,
    ]
};