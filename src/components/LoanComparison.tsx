import { useState } from 'react';
import { Plus, X, AlertCircle, GitCompare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanOption {
  id: string;
  name: string;
  amount: number;
  rate: number;
  term: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function LoanComparison() {
  const [options, setOptions] = useState<LoanOption[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '500000',
    rate: '10',
    term: '48',
  });

  const calculateLoan = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    return { monthlyPayment, totalPayment, totalInterest };
  };

  const addOption = () => {
    if (!formData.name) return;

    const amount = parseFloat(formData.amount);
    const rate = parseFloat(formData.rate);
    const term = parseInt(formData.term);

    if (!amount || !rate || !term) return;

    const calculated = calculateLoan(amount, rate, term);

    const newOption: LoanOption = {
      id: Date.now().toString(),
      name: formData.name,
      amount,
      rate,
      term,
      ...calculated,
    };

    setOptions([...options, newOption]);
    setFormData({ name: '', amount: '500000', rate: '10', term: '48' });
  };

  const removeOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const chartData = options.map((opt) => ({
    name: opt.name,
    'ผ่อน/เดือน': Math.round(opt.monthlyPayment),
    'ดอกเบี้ยรวม': Math.round(opt.totalInterest),
    'ยอดรวมทั้งหมด': Math.round(opt.totalPayment),
  }));

  const bestOption = options.length > 0 
    ? options.reduce((best, current) => 
        current.totalPayment < best.totalPayment ? current : best
      )
    : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Add New Option Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          <h2 className="text-indigo-900">เพิ่มตัวเลือกสินเชื่อเพื่อเปรียบเทียบ</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="block text-gray-700">ชื่อตัวเลือก</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
              placeholder="เช่น ธนาคาร A"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700">จำนวนเงิน (บาท)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700">อัตราดอกเบี้ย (%)</label>
            <input
              type="number"
              step="0.1"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-700">ระยะเวลา (เดือน)</label>
            <input
              type="number"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={addOption}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              เพิ่ม
            </button>
          </div>
        </div>
      </div>

      {/* Best Option Alert */}
      {bestOption && options.length > 1 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-2xl shadow-lg">
          <div className="flex items-start gap-3">
            <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-green-900 mb-1">ตัวเลือกที่ดีที่สุด</h3>
              <p className="text-green-800">
                <strong>{bestOption.name}</strong> มียอดชำระรวมต่ำที่สุดที่{' '}
                {bestOption.totalPayment.toLocaleString('th-TH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                บาท
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Chart */}
      {options.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
            <h3 className="text-indigo-900">กราฟเปรียบเทียบ</h3>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) =>
                    value.toLocaleString('th-TH', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }) + ' บาท'
                  }
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e0e7ff' }}
                />
                <Legend />
                <Bar dataKey="ผ่อน/เดือน" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                <Bar dataKey="ดอกเบี้ยรวม" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="ยอดรวมทั้งหมด" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {options.length > 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
          <div className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
              <h3 className="text-indigo-900">ตารางเปรียบเทียบ</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">ชื่อ</th>
                  <th className="px-6 py-4 text-right">จำนวนเงิน</th>
                  <th className="px-6 py-4 text-right">อัตรา (%)</th>
                  <th className="px-6 py-4 text-right">ระยะเวลา</th>
                  <th className="px-6 py-4 text-right">ผ่อน/เดือน</th>
                  <th className="px-6 py-4 text-right">ดอกเบี้ยรวม</th>
                  <th className="px-6 py-4 text-right">ยอดรวม</th>
                  <th className="px-6 py-4 text-center">ลบ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {options.map((option, index) => (
                  <tr
                    key={option.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-indigo-50/50'
                    } ${
                      bestOption?.id === option.id ? 'bg-green-50 border-l-4 border-green-500' : ''
                    } hover:bg-indigo-100/50 transition-colors`}
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {option.name}
                      {bestOption?.id === option.id && (
                        <span className="ml-2 text-green-600">★ ดีที่สุด</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      {option.amount.toLocaleString('th-TH')}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">{option.rate}</td>
                    <td className="px-6 py-4 text-right text-gray-700">{option.term}</td>
                    <td className="px-6 py-4 text-right text-indigo-600">
                      {option.monthlyPayment.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-right text-orange-600">
                      {option.totalInterest.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">
                      {option.totalPayment.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeOption(option.id)}
                        className="text-red-600 hover:text-red-800 hover:scale-110 transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-indigo-100">
          <GitCompare className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
          <p className="text-gray-500">เพิ่มตัวเลือกสินเชื่อเพื่อเริ่มเปรียบเทียบ</p>
        </div>
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
