import { useState } from 'react';
import { Building2, Search, TrendingDown, TrendingUp } from 'lucide-react';

interface BankRate {
  bank: string;
  logo: string;
  personalLoan: { min: number; max: number };
  homeLoan: { min: number; max: number };
  carLoan: { min: number; max: number };
  updated: string;
}

const bankRates: BankRate[] = [
  {
    bank: 'ธนาคารกสิกรไทย',
    logo: '🏦',
    personalLoan: { min: 10.0, max: 18.0 },
    homeLoan: { min: 3.25, max: 6.5 },
    carLoan: { min: 4.5, max: 7.5 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารกรุงเทพ',
    logo: '🏦',
    personalLoan: { min: 9.5, max: 17.5 },
    homeLoan: { min: 3.35, max: 6.75 },
    carLoan: { min: 4.75, max: 7.25 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารไทยพาณิชย์',
    logo: '🏦',
    personalLoan: { min: 10.5, max: 18.5 },
    homeLoan: { min: 3.45, max: 6.95 },
    carLoan: { min: 4.99, max: 7.99 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารกรุงศรีอยุธยา',
    logo: '🏦',
    personalLoan: { min: 9.99, max: 17.99 },
    homeLoan: { min: 3.29, max: 6.49 },
    carLoan: { min: 4.69, max: 7.49 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารกรุงไทย',
    logo: '🏦',
    personalLoan: { min: 9.0, max: 16.0 },
    homeLoan: { min: 3.15, max: 6.25 },
    carLoan: { min: 4.25, max: 6.99 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารทหารไทยธนชาต',
    logo: '🏦',
    personalLoan: { min: 10.25, max: 18.25 },
    homeLoan: { min: 3.39, max: 6.79 },
    carLoan: { min: 4.89, max: 7.69 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารเกียรตินาคินภัทร',
    logo: '🏦',
    personalLoan: { min: 11.0, max: 19.0 },
    homeLoan: { min: 3.55, max: 7.05 },
    carLoan: { min: 5.25, max: 8.25 },
    updated: '2025-12',
  },
  {
    bank: 'ธนาคารซีไอเอ็มบีไทย',
    logo: '🏦',
    personalLoan: { min: 10.75, max: 18.75 },
    homeLoan: { min: 3.49, max: 6.89 },
    carLoan: { min: 5.15, max: 7.99 },
    updated: '2025-12',
  },
];

export function BankRates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'personal' | 'home' | 'car'>('personal');

  const filteredBanks = bankRates.filter((bank) =>
    bank.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBanks = [...filteredBanks].sort((a, b) => {
    if (sortBy === 'personal') {
      return a.personalLoan.min - b.personalLoan.min;
    } else if (sortBy === 'home') {
      return a.homeLoan.min - b.homeLoan.min;
    } else {
      return a.carLoan.min - b.carLoan.min;
    }
  });

  const getLowestRate = (type: 'personal' | 'home' | 'car') => {
    const rates = bankRates.map((bank) =>
      type === 'personal'
        ? bank.personalLoan.min
        : type === 'home'
        ? bank.homeLoan.min
        : bank.carLoan.min
    );
    return Math.min(...rates);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-indigo-900 mb-2">อัตราดอกเบี้ยธนาคาร</h2>
            <p className="text-gray-600">
              ข้อมูลอัตราดอกเบี้ยโดยประมาณจากธนาคารชั้นนำ (อัปเดต: ธันวาคม 2025)
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาธนาคาร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-600 flex items-center">เรียงตาม:</span>
          <button
            onClick={() => setSortBy('personal')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'personal'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            สินเชื่อส่วนบุคคล
          </button>
          <button
            onClick={() => setSortBy('home')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'home'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            สินเชื่อบ้าน
          </button>
          <button
            onClick={() => setSortBy('car')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'car'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            สินเชื่อรถยนต์
          </button>
        </div>
      </div>

      {/* Lowest Rates Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-6 h-6" />
            <p className="opacity-90">อัตราต่ำสุด - ส่วนบุคคล</p>
          </div>
          <p className="mt-2">{getLowestRate('personal')}% ต่อปี</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-6 h-6" />
            <p className="opacity-90">อัตราต่ำสุด - บ้าน</p>
          </div>
          <p className="mt-2">{getLowestRate('home')}% ต่อปี</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-6 h-6" />
            <p className="opacity-90">อัตราต่ำสุด - รถยนต์</p>
          </div>
          <p className="mt-2">{getLowestRate('car')}% ต่อปี</p>
        </div>
      </div>

      {/* Bank Rates Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left text-indigo-900">ธนาคาร</th>
                <th className="px-6 py-4 text-center text-indigo-900">
                  สินเชื่อส่วนบุคคล
                  <br />
                  <span className="opacity-75">(% ต่อปี)</span>
                </th>
                <th className="px-6 py-4 text-center text-indigo-900">
                  สินเชื่อบ้าน
                  <br />
                  <span className="opacity-75">(% ต่อปี)</span>
                </th>
                <th className="px-6 py-4 text-center text-indigo-900">
                  สินเชื่อรถยนต์
                  <br />
                  <span className="opacity-75">(% ต่อปี)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedBanks.map((bank, index) => (
                <tr
                  key={bank.bank}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{bank.logo}</span>
                      <div>
                        <p className="text-gray-900">{bank.bank}</p>
                        <p className="text-gray-500">
                          อัปเดต: {bank.updated}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-purple-600">
                        {bank.personalLoan.min}% - {bank.personalLoan.max}%
                      </span>
                      {bank.personalLoan.min === getLowestRate('personal') && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <TrendingDown className="w-3 h-3" />
                          ต่ำสุด
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-blue-600">
                        {bank.homeLoan.min}% - {bank.homeLoan.max}%
                      </span>
                      {bank.homeLoan.min === getLowestRate('home') && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <TrendingDown className="w-3 h-3" />
                          ต่ำสุด
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-green-600">
                        {bank.carLoan.min}% - {bank.carLoan.max}%
                      </span>
                      {bank.carLoan.min === getLowestRate('car') && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <TrendingDown className="w-3 h-3" />
                          ต่ำสุด
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Building2 className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-yellow-900 mb-1">หมายเหตุ</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>• อัตราดอกเบี้ยเป็นเพียงข้อมูลโดยประมาณและอาจเปลี่ยนแปลงได้ตามเงื่อนไขของแต่ละธนาคาร</li>
              <li>
                • อัตราดอกเบี้ยจริงขึ้นอยู่กับหลายปัจจัย เช่น ประวัติเครดิต รายได้ และระยะเวลากู้
              </li>
              <li>• ควรติดต่อธนาคารโดยตรงเพื่อสอบถามข้อมูลและเงื่อนไขที่ถูกต้องและเป็นปัจจุบัน</li>
              <li>• ข้อมูลนี้ไม่ใช่คำแนะนำทางการเงินและไม่มีความผูกพันทางกฎหมาย</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
