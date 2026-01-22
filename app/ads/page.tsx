'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Plus,
  Activity,
  DollarSign,
  TrendingUp,
  Target,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { fetchCampaigns, updateCampaignStatus, AdCampaign } from '@/lib/api';

const AdsPage = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // 计算今日总花费和平均 ROAS
  const todaySpent = campaigns.reduce((total, campaign) => total + campaign.spent, 0);
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const averageRoas = activeCampaigns.length > 0
    ? activeCampaigns.reduce((total, campaign) => total + campaign.roas, 0) / activeCampaigns.length
    : 0;

  // 加载广告活动数据
  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('加载广告活动失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // 切换广告活动状态
  const handleToggleStatus = async (id: string, currentStatus: 'active' | 'paused') => {
    setUpdatingStatus(id);
    
    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      const updatedCampaign = await updateCampaignStatus(id, newStatus);
      setCampaigns(campaigns.map(campaign => 
        campaign.id === id ? updatedCampaign : campaign
      ));
    } catch (error) {
      console.error('更新广告活动状态失败:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // 获取平台图标
  const getPlatformIcon = (platform: string) => {
    // 这里可以根据平台返回不同的图标
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="font-bold text-gray-700">{platform.charAt(0)}</span>
      </div>
    );
  };

  // 获取 ROAS 颜色
  const getRoasColor = (roas: number) => {
    if (roas >= 2) return 'text-green-600';
    if (roas >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">广告管理 / Campaigns</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
          onClick={() => router.push('/ads/create')}
        >
          <Plus size={18} />
          <span>新建广告</span>
        </button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 总览卡片 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 今日总花费 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-600">今日总花费</h2>
              <DollarSign size={16} className="text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${todaySpent.toFixed(2)}</div>
          </motion.div>

          {/* 平均 ROAS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-600">平均 ROAS</h2>
              <TrendingUp size={16} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${getRoasColor(averageRoas)}`}>
              {averageRoas.toFixed(1)}x
            </div>
          </motion.div>
        </div>

        {/* 广告活动列表 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">广告活动</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : campaigns.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-xl border border-gray-200 text-center"
            >
              <Activity size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无投放</h3>
              <p className="text-gray-500 mb-4">开始创建您的第一个广告活动</p>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-lg flex items-center mx-auto"
                onClick={() => router.push('/ads/create')}
              >
                去创建
                <ChevronRight size={16} className="ml-1" />
              </button>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(campaign.platform)}
                      <div>
                        <h3 className="font-medium text-gray-900">Campaign #{campaign.id.substring(0, 6)}</h3>
                        <p className="text-sm text-gray-500">{campaign.platform}</p>
                      </div>
                    </div>
                    <button
                      className="relative inline-block w-12 h-6 rounded-full transition-colors"
                      onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                      disabled={updatingStatus === campaign.id}
                    >
                      {campaign.status === 'active' ? (
                        <ToggleRight size={24} className="text-green-500" />
                      ) : (
                        <ToggleLeft size={24} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">花费</div>
                      <div className="font-medium">${campaign.spent.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">ROAS</div>
                      <div className={`font-medium ${getRoasColor(campaign.roas)}`}>
                        {campaign.roas.toFixed(1)}x
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">转化</div>
                      <div className="font-medium">{campaign.conversions}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsPage;