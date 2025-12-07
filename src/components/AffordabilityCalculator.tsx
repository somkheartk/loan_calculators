import { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('50000');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('15000');
  const [existingDebts, setExistingDebts] = useState<string>('5000');
  const [interestRate, setInterestRate] = useState<string>('8');
  const [loanTerm, setLoanTerm] = useState<string>('60');
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateAffordability = () => {
    const income = parseFloat(monthlyIncome) + parseFloat(otherIncome || '0');
    const expenses = parseFloat(monthlyExpenses);
    const debts = parseFloat(existingDebts || '0');
    const rate = parseFloat(interestRate);
    const term = parseInt(loanTerm);

    // คำนวณเงินที่เหลือหลังหักค่าใช้จ่าย
    const disposableIncome = income - expenses - debts;

    // กฎการอนุมัติสินเชื่อ: ยอดผ่อนไม่ควรเกิน 40% ของรายได้
    const maxMonthlyPayment = income * 0.4 - debts;

    // คำนวณจำนวนเงินกู้สูงสุด
    const monthlyRate = rate / 100 / 12;
    const maxLoanAmount =
      (maxMonthlyPayment * (Math.pow(1 + monthlyRate, term) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, term));

    // อัตราส่วนหนี้สินต่อรายได้ (Debt Service Ratio)
    const dsr = ((debts / income) * 100);
    const dsrWithMaxLoan = (((debts + maxMonthlyPayment) / income) * 100);

    // ประเมินความเสี่ยง
    let riskLevel = 'ต่ำ';
    let riskColor = 'green';
    let recommendation = 'คุณมีสถานะทางการเงินที่ดีสำหรับการกู้เงิน';

    if (dsrWithMaxLoan > 50) {
      riskLevel = 'สูง';
      riskColor = 'red';
      recommendation = 'คุณควรลดภาระหนี้ปัจจุบันหรือเพิ่มรายได้ก่อนกู้เพิ่ม';
    } else if (dsrWithMaxLoan > 40) {
      riskLevel = 'ปานกลาง';
      riskColor = 'yellow';
      recommendation = 'คุณยังสามารถกู้ได้แต่ควรระวังการบริหารการเงิน';
    }

    setResult({
      totalIncome: income,
      totalExpenses: expenses + debts,
      disposableIncome,
      maxMonthlyPayment,
      maxLoanAmount,
      dsr,
      dsrWithMaxLoan,
      riskLevel,
      riskColor,
      recommendation,
    });
    setCalculated(true);
  };

  const expenseData = result ? [
    { name: 'ค่าใช้จ่ายประจำ', value: parseFloat(monthlyExpenses) },
    { name: 'หนี้สินปัจจุบัน', value: parseFloat(existingDebts || '0') },
    { name: 'เงินที่เหลือ', value: Math.max(0, result.disposableIncome) },
  ] : [];

  const COLORS = ['#f59e0b', '#ef4444', '#10b981'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Input Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          <h2 className="text-indigo-900">คำนวณความสามารถในการผ่อนชำระ</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-gray-700">รายได้ต่อเดือน (บาท)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="50000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">รายได้อื่นๆ (บาท)</label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">ค่าใช้จ่ายต่อเดือน (บาท)</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="15000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">ยอดผ่อนหนี้ปัจจุบัน/เดือน (บาท)</label>
            <input
              type="number"
              value={existingDebts}
              onChange={(e) => setExistingDebts(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="5000"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">อัตราดอกเบี้ย (% ต่อปี)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="8"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">ระยะเวลา (เดือน)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="60"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={calculateAffordability}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              คำนวณ
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {calculated && result && (
        <>
          {/* Risk Assessment */}
          <div
            className={`border-l-4 p-6 rounded-2xl shadow-lg ${
              result.riskColor === 'green'
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500'
                : result.riskColor === 'yellow'
                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-500'
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-red-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg flex-shrink-0 ${
                result.riskColor === 'green'
                  ? 'bg-green-500'
                  : result.riskColor === 'yellow'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}>
                {result.riskColor === 'green' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : result.riskColor === 'yellow' ? (
                  <AlertCircle className="w-5 h-5 text-white" />
                ) : (
                  <XCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3
                  className={
                    result.riskColor === 'green'
                      ? 'text-green-900 mb-1'
                      : result.riskColor === 'yellow'
                      ? 'text-yellow-900 mb-1'
                      : 'text-red-900 mb-1'
                  }
                >
                  ระดับความเสี่ยง: {result.riskLevel}
                </h3>
                <p
                  className={
                    result.riskColor === 'green'
                      ? 'text-green-800'
                      : result.riskColor === 'yellow'
                      ? 'text-yellow-800'
                      : 'text-red-800'
                  }
                >
                  {result.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
              <h3 className="text-indigo-900">สรุปผลการประเมิน</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <p className="opacity-90 mb-2">จำนวนเงินกู้สูงสุด</p>
                  <p className="mt-2">
                    {result.maxLoanAmount.toLocaleString('th-TH', {
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
                  <p className="opacity-90 mb-2">ยอดผ่อนสูงสุด/เดือน</p>
                  <p className="mt-2">
                    {result.maxMonthlyPayment.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    บาท
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <p className="opacity-90 mb-2">เงินที่เหลือใช้/เดือน</p>
                  <p className="mt-2">
                    {result.disposableIncome.toLocaleString('th-TH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    บาท
                  </p>
                </div>
              </div>
            </div>

            {/* DSR */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <p className="text-gray-700 mb-3">อัตราส่วนหนี้สินต่อรายได้ปัจจุบัน (DSR)</p>
                <p className="text-gray-900 mb-3">{result.dsr.toFixed(2)}%</p>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      result.dsr < 30
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : result.dsr < 40
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                        : 'bg-gradient-to-r from-red-500 to-rose-500'
                    }`}
                    style={{ width: `${Math.min(result.dsr, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-2xl border border-purple-100">
                <p className="text-gray-700 mb-3">
                  DSR หลังกู้เพิ่มตามจำนวนสูงสุด
                </p>
                <p className="text-gray-900 mb-3">
                  {result.dsrWithMaxLoan.toFixed(2)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      result.dsrWithMaxLoan < 30
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : result.dsrWithMaxLoan < 40
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                        : 'bg-gradient-to-r from-red-500 to-rose-500'
                    }`}
                    style={{ width: `${Math.min(result.dsrWithMaxLoan, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Expense Breakdown Chart */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">
              <h4 className="text-gray-700 mb-4 text-center">
                การกระจายรายได้และค่าใช้จ่าย
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
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
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e0e7ff' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-600 to-orange-600 rounded-full"></div>
              <h3 className="text-indigo-900">คำแนะนำในการบริหารการเงิน</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl">
                <span className="text-indigo-600 flex-shrink-0">•</span>
                <span>
                  ธนาคารมักอนุมัติสินเชื่อเมื่อ DSR ไม่เกิน 40% ของรายได้
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl">
                <span className="text-indigo-600 flex-shrink-0">•</span>
                <span>
                  ควรเก็บเงินสำรองฉุกเฉินอย่างน้อย 3-6 เดือนของค่าใช้จ่าย
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl">
                <span className="text-indigo-600 flex-shrink-0">•</span>
                <span>
                  พิจารณาปิดหนี้ที่มีดอกเบี้ยสูงก่อนกู้เพิ่ม
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl">
                <span className="text-indigo-600 flex-shrink-0">•</span>
                <span>
                  กู้เท่าที่จำเป็นและสามารถผ่อนได้อย่างสบายใจ
                </span>
              </li>
            </ul>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}