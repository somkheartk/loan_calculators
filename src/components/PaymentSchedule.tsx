import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PaymentScheduleProps {
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export function PaymentSchedule({ schedule }: PaymentScheduleProps) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const displaySchedule = showFullSchedule ? schedule : schedule.slice(0, 12);
  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const paginatedSchedule = schedule.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Prepare chart data - sample every nth item for readability
  const chartSampleRate = Math.ceil(schedule.length / 24);
  const chartData = schedule
    .filter((_, index) => index % chartSampleRate === 0 || index === schedule.length - 1)
    .map((item) => ({
      month: item.month,
      เงินต้น: item.principal,
      ดอกเบี้ย: item.interest,
      คงเหลือ: item.balance,
    }));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
        <h3 className="text-indigo-900">ตารางการชำระเงิน</h3>
      </div>

      {/* Chart */}
      <div className="mb-8 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl">
        <h4 className="text-gray-700 mb-4">กราฟแสดงการชำระเงิน</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis dataKey="month" label={{ value: 'เดือน', position: 'insideBottom', offset: -5 }} />
            <YAxis />
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
            <Area
              type="monotone"
              dataKey="เงินต้น"
              stackId="1"
              stroke="#4f46e5"
              fill="#4f46e5"
            />
            <Area
              type="monotone"
              dataKey="ดอกเบี้ย"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-indigo-100">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">งวดที่</th>
              <th className="px-4 py-3 text-right">ชำระต่องวด</th>
              <th className="px-4 py-3 text-right">เงินต้น</th>
              <th className="px-4 py-3 text-right">ดอกเบี้ย</th>
              <th className="px-4 py-3 text-right">คงเหลือ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {(showFullSchedule ? paginatedSchedule : displaySchedule).map((item, index) => (
              <tr
                key={item.month}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-indigo-50/50'
                } hover:bg-indigo-100/50 transition-colors`}
              >
                <td className="px-4 py-3 text-gray-700">{item.month}</td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {item.payment.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right text-indigo-600">
                  {item.principal.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right text-orange-600">
                  {item.interest.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">
                  {item.balance.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Show More/Less */}
      {schedule.length > 12 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            {showFullSchedule ? (
              <>
                <ChevronUp className="w-5 h-5" />
                แสดงน้อยลง
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                แสดงทั้งหมด ({schedule.length} งวด)
              </>
            )}
          </button>

          {showFullSchedule && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ก่อนหน้า
              </button>
              <span className="text-gray-600 px-4">
                หน้า {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ถัดไป
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}