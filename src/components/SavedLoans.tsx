import { useState, useEffect } from 'react';
import { Trash2, Download, Calendar, DollarSign } from 'lucide-react';

interface SavedLoan {
  id: string;
  name: string;
  type: string;
  amount: number;
  rate: number;
  term: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  savedDate: string;
}

export function SavedLoans() {
  const [savedLoans, setSavedLoans] = useState<SavedLoan[]>([]);

  useEffect(() => {
    // โหลดข้อมูลที่บันทึกไว้จาก localStorage
    const stored = localStorage.getItem('savedLoans');
    if (stored) {
      setSavedLoans(JSON.parse(stored));
    }
  }, []);

  const deleteLoan = (id: string) => {
    const updated = savedLoans.filter((loan) => loan.id !== id);
    setSavedLoans(updated);
    localStorage.setItem('savedLoans', JSON.stringify(updated));
  };

  const exportToCSV = () => {
    if (savedLoans.length === 0) return;

    const headers = [
      'ชื่อ',
      'ประเภท',
      'จำนวนเงิน',
      'อัตราดอกเบี้ย',
      'ระยะเวลา',
      'ผ่อน/เดือน',
      'ดอกเบี้ยรวม',
      'ยอดรวม',
      'วันที่บันทึก',
    ];

    const rows = savedLoans.map((loan) => [
      loan.name,
      loan.type,
      loan.amount,
      loan.rate,
      loan.term,
      loan.monthlyPayment.toFixed(2),
      loan.totalInterest.toFixed(2),
      loan.totalPayment.toFixed(2),
      loan.savedDate,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `สินเชื่อที่บันทึก_${new Date().toLocaleDateString('th-TH')}.csv`;
    link.click();
  };

  const clearAll = () => {
    if (confirm('คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่?')) {
      setSavedLoans([]);
      localStorage.removeItem('savedLoans');
    }
  };

  // สรุปยอดรวม
  const totalAmount = savedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalMonthly = savedLoans.reduce(
    (sum, loan) => sum + loan.monthlyPayment,
    0
  );
  const totalInterest = savedLoans.reduce(
    (sum, loan) => sum + loan.totalInterest,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-indigo-900">สินเชื่อที่บันทึกไว้</h2>
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              disabled={savedLoans.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              ส่งออก CSV
            </button>
            <button
              onClick={clearAll}
              disabled={savedLoans.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              ลบทั้งหมด
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {savedLoans.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6" />
              <p className="opacity-90">ยอดกู้รวม</p>
            </div>
            <p className="mt-2">
              {totalAmount.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6" />
              <p className="opacity-90">ผ่อนรวม/เดือน</p>
            </div>
            <p className="mt-2">
              {totalMonthly.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6" />
              <p className="opacity-90">ดอกเบี้ยรวม</p>
            </div>
            <p className="mt-2">
              {totalInterest.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              บาท
            </p>
          </div>
        </div>
      )}

      {/* Saved Loans List */}
      {savedLoans.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-indigo-900">ชื่อ</th>
                  <th className="px-4 py-3 text-left text-indigo-900">ประเภท</th>
                  <th className="px-4 py-3 text-right text-indigo-900">จำนวนเงิน</th>
                  <th className="px-4 py-3 text-right text-indigo-900">อัตรา (%)</th>
                  <th className="px-4 py-3 text-right text-indigo-900">ระยะเวลา</th>
                  <th className="px-4 py-3 text-right text-indigo-900">ผ่อน/เดือน</th>
                  <th className="px-4 py-3 text-right text-indigo-900">ดอกเบี้ย</th>
                  <th className="px-4 py-3 text-right text-indigo-900">ยอดรวม</th>
                  <th className="px-4 py-3 text-left text-indigo-900">วันที่บันทึก</th>
                  <th className="px-4 py-3 text-center text-indigo-900">ลบ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {savedLoans.map((loan, index) => (
                  <tr
                    key={loan.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3 text-gray-700">{loan.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                          loan.type === 'ส่วนบุคคล'
                            ? 'bg-purple-500'
                            : loan.type === 'บ้าน'
                            ? 'bg-blue-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {loan.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {loan.amount.toLocaleString('th-TH')}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">{loan.rate}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {loan.term} เดือน
                    </td>
                    <td className="px-4 py-3 text-right text-indigo-600">
                      {loan.monthlyPayment.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3 text-right text-orange-600">
                      {loan.totalInterest.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {loan.totalPayment.toLocaleString('th-TH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{loan.savedDate}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => deleteLoan(loan.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">ยังไม่มีสินเชื่อที่บันทึกไว้</p>
          <p className="text-gray-400">
            คำนวณสินเชื่อและกดปุ่ม &quot;บันทึก&quot; เพื่อเก็บข้อมูลไว้ใช้ในภายหลัง
          </p>
        </div>
      )}
    </div>
  );
}
