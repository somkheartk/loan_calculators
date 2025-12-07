import { useState } from 'react';
import { LoanResult } from './LoanResult';
import { PaymentSchedule } from './PaymentSchedule';
import { Save } from 'lucide-react';

export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('300000');
  const [interestRate, setInterestRate] = useState<string>('12');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const months = parseInt(loanTerm);

    if (!principal || !annualRate || !months) return;

    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
      schedule,
    });
    setCalculated(true);
  };

  const saveLoan = () => {
    if (!result) return;

    const savedLoan = {
      id: Date.now().toString(),
      name: `สินเชื่อส่วนบุคคล ${new Date().toLocaleDateString('th-TH')}`,
      type: 'ส่วนบุคคล',
      amount: result.principal,
      rate: parseFloat(interestRate),
      term: parseInt(loanTerm),
      monthlyPayment: result.monthlyPayment,
      totalPayment: result.totalPayment,
      totalInterest: result.totalInterest,
      savedDate: new Date().toLocaleDateString('th-TH'),
    };

    const existing = localStorage.getItem('savedLoans');
    const loans = existing ? JSON.parse(existing) : [];
    loans.push(savedLoan);
    localStorage.setItem('savedLoans', JSON.stringify(loans));

    alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Input Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          <h2 className="text-indigo-900">ข้อมูลสินเชื่อส่วนบุคคล</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-gray-700">จำนวนเงินกู้ (บาท)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="300000"
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
              placeholder="12"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">ระยะเวลา (เดือน)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="36"
            />
            <p className="text-gray-500 mt-1">
              {loanTerm ? `${(parseInt(loanTerm) / 12).toFixed(1)} ปี` : ''}
            </p>
          </div>

          <div className="flex items-end">
            <button
              onClick={calculateLoan}
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
          <LoanResult result={result} />
          
          {/* Save Button */}
          <div className="flex justify-center">
            <button
              onClick={saveLoan}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              <Save className="w-5 h-5" />
              บันทึกสินเชื่อนี้
            </button>
          </div>

          <PaymentSchedule schedule={result.schedule} />
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