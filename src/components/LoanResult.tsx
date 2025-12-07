import { DollarSign, TrendingUp, Wallet } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface LoanResultProps {
  result: {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    principal: number;
  };
}

export function LoanResult({ result }: LoanResultProps) {
  const chartData = [
    { name: 'เงินต้น', value: result.principal },
    { name: 'ดอกเบี้ย', value: result.totalInterest },
  ];

  const COLORS = ['#4f46e5', '#f59e0b'];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
        <h3 className="text-indigo-900">ผลการคำนวณ</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Wallet className="w-5 h-5" />
              </div>
              <p className="opacity-90">ผ่อนชำระต่อเดือน</p>
            </div>
            <p className="mt-2">
              {result.monthlyPayment.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="opacity-90">ยอดชำระทั้งหมด</p>
            </div>
            <p className="mt-2">
              {result.totalPayment.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="opacity-90">ดอกเบี้ยรวม</p>
            </div>
            <p className="mt-2">
              {result.totalInterest.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl">
        <h4 className="text-gray-700 mb-4 text-center">สัดส่วนเงินต้นและดอกเบี้ย</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) =>
                value.toLocaleString('th-TH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + ' บาท'
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}