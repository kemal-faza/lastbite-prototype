import { User, Settings, Clock, Heart, Award, ChevronRight, LogOut, Shield, HelpCircle } from 'lucide-react';

const MENU_ITEMS = [
  { icon: Clock, label: 'Riwayat Pesanan', path: '#' },
  { icon: Heart, label: 'Toko Favorit', path: '#' },
  { icon: Shield, label: 'Keamanan Akun', path: '#' },
  { icon: Settings, label: 'Pengaturan', path: '#' },
  { icon: HelpCircle, label: 'Pusat Bantuan', path: '#' },
];

export function Profile() {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-8">
      {/* Profile Header */}
      <div className="bg-white px-4 pt-8 pb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Nadia Putri</h1>
            <p className="text-sm text-gray-500 mb-2">nadia.putri@example.com</p>
            <div className="inline-flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-green-700">Food Saver Level 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="px-4 mt-4 mb-2">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 px-1">Dampak Kamu Sejauh Ini</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-green-600 font-bold text-lg">Rp</span>
            </div>
            <span className="text-xl font-bold text-gray-900 leading-none mb-1">450K</span>
            <span className="text-xs text-gray-500">Uang Dihemat</span>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xl font-bold text-gray-900 leading-none mb-1">12</span>
            <span className="text-xs text-gray-500">Porsi Diselamatkan</span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {MENU_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === MENU_ITEMS.length - 1;
            
            return (
              <button 
                key={index}
                className={`w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors ${
                  !isLast ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6 mb-8">
        <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-red-200 rounded-xl text-red-500 font-medium hover:bg-red-50 active:scale-[0.98] transition-all">
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">lastbite v1.0.0</p>
      </div>
    </div>
  );
}