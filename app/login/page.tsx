'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Lock, Eye, EyeOff, BarChart2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('401613485'); // 预填方便测试
  const [password, setPassword] = useState('..........');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟登录逻辑
    console.log('Logging in with', phone);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col items-center justify-center p-6">
      {/* 顶部 Logo 区域 */}
      <div className="mb-8 flex flex-col items-center animate-fade-in-down">
        <div className="w-16 h-16 bg-gradient-to-tr from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <BarChart2 className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
        <p className="text-gray-500 text-sm">登录以管理您的店铺数据</p>
      </div>

      {/* 登录卡片 */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up">
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* 手机号输入 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              手机号码
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="请输入手机号码"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* 密码输入 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-semibold text-gray-700">
                密码
              </label>
              <button type="button" className="text-xs font-medium text-green-600 hover:text-green-700">
                忘记密码?
              </button>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* 登录按钮 (这次绝对不会丢) */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 transform active:scale-[0.98] transition-all duration-200 text-lg mt-4"
          >
            登 录
          </button>
        </form>

        {/* 底部注册引导 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            还没有账号?{' '}
            <button 
              onClick={() => router.push('/onboarding')}
              className="text-green-600 font-bold hover:underline"
            >
              立即注册
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}