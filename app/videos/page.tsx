'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Video,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';

// Mock 商品数据
const mockProducts = [
  {
    id: '1',
    name: 'Bluetooth Speaker',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portable%20bluetooth%20speaker%20on%20white%20background&image_size=square',
    price: 45.99,
    卖点: '防水设计，360度环绕音，24小时续航',
  },
  {
    id: '2',
    name: 'Lumina Smart Desk Lamp',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smart%20desk%20lamp%20on%20white%20background&image_size=square',
    price: 89.99,
    卖点: '智能调光，护眼模式，APP控制',
  },
  {
    id: '3',
    name: 'Fitness Tracker Pro',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fitness%20tracker%20smartwatch%20on%20wrist&image_size=square',
    price: 59.99,
    卖点: '心率监测，睡眠分析，50米防水',
  },
  {
    id: '4',
    name: 'Portable Charger 20000mAh',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=portable%20power%20bank%2020000mah%20slim%20design&image_size=square',
    price: 29.99,
    卖点: '快充技术，大容量，多设备兼容',
  },
];

// Mock 视频数据
const initialVideos = [
  {
    id: '1',
    title: 'Bluetooth Speaker Unboxing',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20thumbnail%20bluetooth%20speaker%20unboxing&image_size=square',
    product: 'Bluetooth Speaker',
    status: 'published',
  },
  {
    id: '2',
    title: 'Lumina Lamp Setup Guide',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20thumbnail%20smart%20desk%20lamp%20setup&image_size=square',
    product: 'Lumina Smart Desk Lamp',
    status: 'published',
  },
  {
    id: '3',
    title: 'Fitness Tracker Review',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20thumbnail%20fitness%20tracker%20review&image_size=square',
    product: 'Fitness Tracker Pro',
    status: 'generating',
  },
];

const VideosPage = () => {
  // 状态管理
  const [videos, setVideos] = useState(initialVideos);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [showAiGeneration, setShowAiGeneration] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // AI 生成状态文案
  const aiStatusMessages = [
    '正在分析卖点...',
    '正在匹配素材...',
    '正在合成语音...',
  ];

  // 打开商品选择器
  const handleNewVideoTask = () => {
    setShowProductPicker(true);
  };

  // 选择商品
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  // 立即生成 AI 视频
  const handleGenerateAiVideo = () => {
    if (selectedProduct) {
      setShowProductPicker(false);
      setShowAiGeneration(true);
      startAiGeneration();
    }
  };

  // 开始 AI 生成
  const startAiGeneration = () => {
    setIsGenerating(true);
    setAiProgress(0);
    setAiStatus(aiStatusMessages[0]);

    // 模拟 3秒 生成过程
    const interval = setInterval(() => {
      setAiProgress((prev) => {
        const newProgress = prev + 33;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setShowAiGeneration(false);
            // 添加新生成的视频到列表
            const newVideo = {
              id: Date.now().toString(),
              title: `${selectedProduct.name} - AI Generated Video`,
              cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=video%20thumbnail%20ai%20generated%20product%20video&image_size=square',
              product: selectedProduct.name,
              status: 'published',
            };
            setVideos([newVideo, ...videos]);
            // 显示 Toast 通知
            setToastMessage(`视频已生成，已关联至 ${selectedProduct.name}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          }, 500);
          return 100;
        }
        // 更新状态文案
        if (newProgress >= 33 && newProgress < 66) {
          setAiStatus(aiStatusMessages[1]);
        } else if (newProgress >= 66) {
          setAiStatus('渲染中...');
        }
        return newProgress;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">短视频矩阵 / Content Matrix</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
          onClick={handleNewVideoTask}
        >
          <Plus size={18} />
          <span>新建视频任务</span>
        </button>
      </header>

      {/* 视频列表 */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={video.cover}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Video size={32} className="text-white" />
                </div>
                {video.status === 'generating' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>生成中</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">{video.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    {video.product}
                  </span>
                  {video.status === 'published' ? (
                    <div className="flex items-center text-xs text-green-600">
                      <CheckCircle2 size={12} className="mr-1" />
                      <span>已发布</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-xs text-yellow-600">
                      <Clock size={12} className="mr-1" />
                      <span>生成中</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal 1: 商品选择器 */}
      <AnimatePresence>
        {showProductPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowProductPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">选择关联商品</h3>
              </div>
              <div className="p-4 space-y-3">
                {mockProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 border rounded-lg cursor-pointer ${selectedProduct?.id === product.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{product.卖点}</p>
                        <p className="text-sm font-medium text-gray-900 mt-1">${product.price}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2"
                  onClick={() => setShowProductPicker(false)}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
                  onClick={handleGenerateAiVideo}
                  disabled={!selectedProduct}
                >
                  <Zap size={16} className="mr-1" />
                  立即生成 AI 视频
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Modal 3: AI 生成过程 */}
      <AnimatePresence>
        {showAiGeneration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => !isGenerating && setShowAiGeneration(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center">
                <button
                  className="mr-3"
                  onClick={() => {
                    if (!isGenerating) {
                      setShowAiGeneration(false);
                    }
                  }}
                  disabled={isGenerating}
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">AI 视频生成</h3>
              </div>
              
              {!isGenerating ? (
                <div className="p-6 space-y-4">
                  {/* 所选商品信息 */}
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={selectedProduct?.image}
                          alt={selectedProduct?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium text-gray-900">{selectedProduct?.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{selectedProduct?.卖点}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">AI 将基于商品信息生成一段创意视频</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium"
                      onClick={startAiGeneration}
                    >
                      开始生成
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {/* 进度条 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">生成进度</span>
                      <span className="text-sm font-medium text-gray-700">{aiProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${aiProgress}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                  </div>
                  
                  {/* 状态信息 */}
                  <div className="text-center py-4">
                    <p className="text-gray-700">{aiStatus}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast 通知 */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideosPage;