import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { LuTrendingUp } from 'react-icons/lu';
// Importe o seu contexto de transações
import { useTransactions } from '@/contexts/transactionsContext';

export function BalanceEvolution() {
    // Puxando os dados reais calculados pelo seu provider
    const { dailyBalances } = useTransactions();

    const formatYAxis = (tickItem: number) => {
        if (tickItem === 0) return "R$ 0";
        // Assumindo que seu amount está em centavos, dividimos por 100 para reais, 
        // e depois por 1000 para o formato "k" (ex: 10k). Se não estiver em centavos, ajuste aqui.
        return `R$ ${((tickItem / 100) / 1000).toFixed(1)}k`;
    };

    // Calculando a diferença dos últimos 7 dias (opcional, para o rodapé)
    const calculateTrend = () => {
        if (!dailyBalances || dailyBalances.length < 2) return 0;
        
        const currentBalance = dailyBalances[dailyBalances.length - 1].balance;
        // Pega o saldo de 7 dias atrás (ou o primeiro disponível se tiver menos de 7 dias de histórico)
        const pastIndex = Math.max(0, dailyBalances.length - 8);
        const pastBalance = dailyBalances[pastIndex].balance;

        return currentBalance - pastBalance;
    };

    const trendValue = calculateTrend();
    const isPositiveTrend = trendValue >= 0;

    return (
        <div className="flex flex-col w-5/7 bg-white border border-[#E2E8F0] rounded-xl shadow-sm p-6 font-sans">
            
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#1E293B]">Evolução do saldo</h2>
                <select className="px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] font-medium outline-none cursor-pointer hover:bg-gray-50 transition-colors">
                    <option value="diario">Diário</option>
                </select>
            </div>

            <div className="w-full h-[150px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    {/* Substituímos o mockHistoricalData pelo dailyBalances */}
                    <AreaChart
                        data={dailyBalances}
                        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94A3B8', fontSize: 12 }}
                            dy={10}
                        />
                        
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94A3B8', fontSize: 12 }}
                            tickFormatter={formatYAxis}
                        />
                        
                        <Tooltip 
                            formatter={(value: any) => {
                                const numericValue = Number(value) || 0; 
                                // Dividindo por 100 assumindo que está em centavos
                                return [`R$ ${(numericValue / 100).toFixed(2)}`, 'Saldo'];
                            }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        
                        <Area 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorBalance)" 
                            activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Rodapé Dinâmico */}
            {dailyBalances.length > 0 && (
                <div className="mt-6 flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-xl border border-[#F1F5F9]">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#10B981]/10 shrink-0">
                        <LuTrendingUp className={`w-5 h-5 ${isPositiveTrend ? 'text-[#10B981]' : 'text-red-500 transform rotate-180'}`} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-[#1E293B]">
                            Seu saldo {isPositiveTrend ? 'aumentou' : 'diminuiu'} R$ {Math.abs(trendValue / 100).toFixed(2)} nos últimos 7 dias.
                        </p>
                        <p className="text-sm text-[#64748B]">
                            {isPositiveTrend ? 'Continue assim! 💪' : 'Atenção aos gastos! ⚠️'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}