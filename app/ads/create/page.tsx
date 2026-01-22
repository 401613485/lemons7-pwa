'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  TrendingUp,
  Rocket,
  Circle,
  CheckCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { createCampaign } from '@/lib/api';

// ROI 策略数据
const roiData = [
  {
    name: '保守',
    投入: 50,
    回报: 80,
  },
  {
    name: '均衡',
    投入: 120,
    回报: 300,
  },
  {
    name: '爆发',
    投入: 250,
    回报: 800,
  },
];

// 策略选项
const strategyOptions = [
  {
    id: 'conservative',
    name: '保守型',
    dailyBudget: 50,
    roas: 1.6,
    description: '适合新手，风险低',
  },
  {
    id: 'balanced',
    name: '均衡型',
    dailyBudget: 120,
    roas: 3.4,
    description: '推荐，平衡风险和回报',
    recommended: true,
  },
  {
    id: 'aggressive',
    name: '增长型',
    dailyBudget: 250,
    roas: 4.1,
    description: '适合有经验的卖家',
  },
];

// 广告渠道
const adChannels = [
  {
    id: 'tiktok',
    name: 'TikTok',
    enabled: true,
  },
  {
    id: 'meta',
    name: 'Meta',
    enabled: false,
  },
  {
    id: 'google',
    name: 'Google',
    enabled: false,
  },
];

const CreateAdPage = () => {
  const router = useRouter();
  const [selectedStrategy, setSelectedStrategy] = useState('balanced');
  const [selectedChannel, setSelectedChannel] = useState('tiktok');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // 获取当前选中的策略
  const currentStrategy = strategyOptions.find(
    (option) => option.id === selectedStrategy
  );

  // 处理策略选择
  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId);
  };

  // 处理渠道选择
  const handleChannelSelect = (channelId: string) => {
    const channel = adChannels.find((ch) => ch.id === channelId);
    if (channel && channel.enabled) {
      setSelectedChannel(channelId);
    }
  };

  // 处理启动投放
  const handleLaunchCampaign = async () => {
    setShowSuccessAnimation(true);
    
    try {
      // 创建广告活动
      await createCampaign({
        platform: selectedChannel,
        budget: currentStrategy?.dailyBudget || 120,
      });
      
      // 跳转至广告列表页
      setTimeout(() => {
        router.push('/ads');
      }, 2000);
    } catch (error) {
      console.error('创建广告活动失败:', error);
      // 可以添加错误处理逻辑
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 顶部导航 */}
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">广告配置 / Ad Setup</h1>
      </header>

      <div className="px-4 py-6 space-y-8">
        {/* 渠道选择 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">投放渠道</h2>
          <div className="grid grid-cols-3 gap-3">
            {adChannels.map((channel) => (
              <motion.div
                key={channel.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center ${channel.enabled ? selectedChannel === channel.id ? 'border-green-500 bg-green-50' : 'border-gray-200' : 'border-gray-200 bg-gray-50 opacity-60'}`}
                onClick={() => handleChannelSelect(channel.id)}
              >
                <div className="text-2xl font-bold mb-2">{channel.name.charAt(0)}</div>
                <h3 className="font-medium text-center mb-2">{channel.name}</h3>
                {channel.enabled ? (
                  selectedChannel === channel.id ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <Circle size={16} className="text-gray-400" />
                  )
                ) : (
                  <span className="text-xs text-gray-500">Coming Soon</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ROI 策略推演 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">AI 策略预测 (ROI Prediction)</h2>
            <TrendingUp size={20} className="text-green-600" />
          </div>
          
          {/* 图表 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={roiData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="投入" fill="#E5E7EB" name="投入 (USD)" />
                <Bar dataKey="回报" fill="#10B981" name="预估回报 (USD)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 策略选择卡片 */}
          <div className="space-y-3">
            {strategyOptions.map((strategy) => (
              <motion.div
                key={strategy.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer ${selectedStrategy === strategy.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                onClick={() => handleStrategySelect(strategy.id)}
              >
                <div className="flex items-center space-x-3">
                  {selectedStrategy === strategy.id ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-gray-400" />
                  )}
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{strategy.name}</h3>
                      {strategy.recommended && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">推荐</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{strategy.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${strategy.dailyBudget}/day</div>
                  <div className="text-sm text-gray-600">预估 {strategy.roas}x ROAS</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部发射按钮 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-500 text-white font-medium py-4 px-4 rounded-lg flex items-center justify-center space-x-2"
          onClick={handleLaunchCampaign}
        >
          <Rocket size={18} />
          <span>🚀 开启投放 (${currentStrategy?.dailyBudget}/day)</span>
        </motion.button>
      </motion.div>

      {/* 成功动画 */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
              className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle size={64} className="text-green-500" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              广告已部署
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600"
            >
              AI 正在接管，为您优化投放策略
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateAdPage;