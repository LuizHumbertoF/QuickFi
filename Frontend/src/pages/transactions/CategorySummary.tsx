import React, { useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import type { Transaction } from './Transactions';

interface CategorySummaryProps {
    transactions: Transaction[];
}

// Mapa de cores fixas para manter a consistência visual nas categorias
const CATEGORY_COLORS: Record<string, string> = {
    'Trabalho': '#3B82F6',       // Azul
    'Investimentos': '#8B5CF6',  // Roxo escuro
    'Moradia': '#A855F7',        // Roxo claro
    'Alimentação': '#F97316',    // Laranja
    'Transporte': '#EAB308',     // Amarelo
    'Lazer': '#10B981',          // Verde
    'Compras': '#EC4899',        // Rosa
    'Outro': '#64748B',          // Cinza
};

export function CategorySummary({ transactions }: CategorySummaryProps) {
    
    // Processamos os dados dinamicamente usando useMemo para performance
    const chartData = useMemo(() => {
        // 1. Filtra apenas as despesas
        const expenses = transactions.filter(
            (t) => t.type.toLowerCase() === 'despesa'
        );

        // 2. Calcula o valor total das despesas (para calcular a porcentagem depois)
        const totalExpenses = expenses.reduce((acc, current) => acc + current.amount, 0);

        // 3. Agrupa e soma os valores por categoria
        const grouped = expenses.reduce((acc, t) => {
            if (!acc[t.category]) {
                acc[t.category] = 0;
            }
            acc[t.category] += t.amount;
            return acc;
        }, {} as Record<string, number>);

        // 4. Formata para o array final que o Recharts espera
        return Object.entries(grouped)
            .map(([categoryName, totalAmount]) => {
                const percent = totalExpenses > 0 
                    ? Math.round((totalAmount / totalExpenses) * 100) 
                    : 0;

                const categoryColor = CATEGORY_COLORS[categoryName] || CATEGORY_COLORS['Outro'];

                return {
                    name: categoryName,
                    value: totalAmount,
                    percent: percent,
                    // Usa a cor definida no mapa ou um cinza padrão se a categoria não estiver lá
                    color: CATEGORY_COLORS[categoryName] || CATEGORY_COLORS['Outro'],
                    fill: categoryColor
                };
            })
            // 5. Ordena do maior gasto para o menor para a legenda ficar mais organizada
            .sort((a, b) => b.value - a.value);

    }, [transactions]);

    // Se não houver despesas, podemos renderizar um estado vazio amigável
    if (chartData.length === 0) {
        return (
            <div className="flex flex-col w-[350px] h-[250px] p-6 bg-white border rounded-lg shadow-sm border-[#94A3B8]/20 items-center justify-center">
                <p className="text-sm text-[#64748B]">Nenhuma despesa registrada.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-[310px] h-80 ml-auto p-6 bg-white border rounded-lg shadow-sm border-[#94A3B8]/20 overflow-y-auto font-sans">
            
            {/* Cabeçalho */}
            <p className="font-semibold text-[#1E293B] mb-6 text-sm">
                Resumo por despesa
            </p>

            {/* Corpo (Gráfico + Legenda) */}
            <div className="flex flex-row items-center mb-6">
                
                {/* Gráfico */}
                <div className="w-[120px] h-[120px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            /> 
                            {/* O map com o <Cell /> foi totalmente removido daqui! */}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Lista de Categorias */}
                <div className="flex flex-col w-full ml-4 gap-3">
                    {chartData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between w-full">
                            
                            <div className="flex items-start gap-2">
                                <div 
                                    className="w-2 h-2 rounded-full mt-1 shrink-0" 
                                    style={{ backgroundColor: item.color }} 
                                />
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="text-[11px] text-[#64748B]">
                                        {item.name}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#1E293B]">
                                        {/* Dividindo por 100 assumindo que o seu amount está em centavos */}
                                        {(item.value / 100).toLocaleString('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        })}
                                    </span>
                                </div>
                            </div>

                            <span className="text-[11px] text-[#94A3B8] font-medium ml-2">
                                {item.percent}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rodapé */}
            <div className="flex justify-center items-center mt-auto w-full p-2 border-t border-[#F1F5F9]">
                <button className="text-xs cursor-pointer transition-all duration-200 hover:-translate-y-1 font-semibold text-[#10B981] flex items-center justify-center gap-1">
                    Ver relatório completo <span>&gt;</span>
                </button>
            </div>

        </div>
    );
}