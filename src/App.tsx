import { useState } from 'react';
import { PersonalLoanCalculator } from './components/PersonalLoanCalculator';
import { HomeLoanCalculator } from './components/HomeLoanCalculator';
import { CarLoanCalculator } from './components/CarLoanCalculator';
import { LoanComparison } from './components/LoanComparison';
import { AffordabilityCalculator } from './components/AffordabilityCalculator';
import { SavedLoans } from './components/SavedLoans';
import { BankRates } from './components/BankRates';
import { Calculator, Home, Car, GitCompare, Wallet, Save, TrendingDown } from 'lucide-react';

type TabType = 'personal' | 'home' | 'car' | 'compare' | 'affordability' | 'saved' | 'rates';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-indigo-900">ระบบคำนวณสินเชื่อครบวงจร</h1>
                <p className="text-gray-600">เครื่องมือวางแผนทางการเงินแบบมืออาชีพ</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>สินเชื่อส่วนบุคคล</span>
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>สินเชื่อบ้าน</span>
            </button>
            <button
              onClick={() => setActiveTab('car')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'car'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>สินเชื่อรถยนต์</span>
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'compare'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>เปรียบเทียบ</span>
            </button>
            <button
              onClick={() => setActiveTab('affordability')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'affordability'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>ความสามารถผ่อน</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'saved'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <Save className="w-4 h-4" />
              <span>บันทึก</span>
            </button>
            <button
              onClick={() => setActiveTab('rates')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'rates'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>อัตราธนาคาร</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'personal' && <PersonalLoanCalculator />}
          {activeTab === 'home' && <HomeLoanCalculator />}
          {activeTab === 'car' && <CarLoanCalculator />}
          {activeTab === 'compare' && <LoanComparison />}
          {activeTab === 'affordability' && <AffordabilityCalculator />}
          {activeTab === 'saved' && <SavedLoans />}
          {activeTab === 'rates' && <BankRates />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-indigo-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="bg-amber-500 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-amber-900 mb-2">คำเตือนและข้อจำกัดความรับผิด</h3>
                <ul className="text-amber-800 space-y-1">
                  <li>• ผลการคำนวณเป็นเพียงการประมาณการเบื้องต้นเท่านั้น</li>
                  <li>• อัตราดอกเบี้ยและเงื่อนไขจริงอาจแตกต่างกันขึ้นอยู่กับธนาคารและคุณสมบัติของผู้กู้</li>
                  <li>• ข้อมูลนี้ไม่ใช่คำแนะนำทางการเงินและไม่มีความผูกพันทางกฎหมาย</li>
                  <li>• ควรปรึกษาผู้เชี่ยวชาญทางการเงินก่อนตัดสินใจกู้เงิน</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-600 border-t border-gray-200 pt-6">
            <p>© 2025 ระบบคำนวณสินเชื่อครบวงจร | พัฒนาเพื่อการให้บริการข้อมูลเท่านั้น</p>
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
