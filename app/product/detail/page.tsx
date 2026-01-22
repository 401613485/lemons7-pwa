'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Share2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

// 模拟商品数据
const productData = {
  id: '1',
  name: 'Lumina Smart Desk Lamp',
  price: 45.00,
  stock: 150,
  stockStatus: '库存充足',
  tags: ['#SmartHome', '#Ergonomic', '#Minimalist'],
  description: 'AI Generated Description: The Lumina Smart Desk Lamp combines sleek design with advanced functionality. Featuring adjustable brightness levels, color temperature control, and smart home integration, it\'s perfect for work, study, or relaxation. The minimalist design fits seamlessly into any modern workspace, while the ergonomic features reduce eye strain during long hours of use. Built with high-quality materials for durability and performance.',
  images: [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20smart%20desk%20lamp%20on%20white%20background%20product%20photography&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20desk%20lamp%20in%20modern%20home%20office%20setting&image_size=square',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20desk%20lamp%20with%20adjustable%20brightness%20demonstration&image_size=square',
  ],
  aiAnalysis: {
    marketScore: 87,
    compliance: {
      copyright: '未检测到侵权',
      policy: '建议优化描述',
    },
  },
};

const ProductDetailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);

  // 从 URL 参数获取数据
  const demoPrice = searchParams.get('price');
  const demoInventory = searchParams.get('inventory');
  const demoSku = searchParams.get('sku');
  const demoDesc = searchParams.get('desc');

  // 构建实际显示的数据
  const displayData = {
    name: demoSku ? `Product - ${demoSku}` : productData.name,
    price: demoPrice ? parseFloat(demoPrice) : productData.price,
    stock: demoInventory ? parseInt(demoInventory) : productData.stock,
    stockStatus: demoInventory && parseInt(demoInventory) > 0 ? '库存充足' : productData.stockStatus,
    tags: demoSku ? [`#${demoSku}`, '#NewProduct'] : productData.tags,
    description: demoDesc || productData.description,
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleGenerateAiReport = () => {
    setShowAiDrawer(true);
  };

  const handleNextStep = () => {
    router.push('/creative');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent flex items-center justify-between px-4 py-6">
        <button
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} className="text-gray-900" />
        </button>
        <button
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:bg-white transition-colors"
        >
          <Share2 size={20} className="text-gray-900" />
        </button>
      </header>

      <div className="pt-6">
        {/* 图片轮播 */}
        <div className="relative h-[50vh]">
          {productData.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-300 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={image}
                alt={`${productData.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* 分页指示器 */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {productData.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>

        {/* 商品信息卡片 */}
        <div className="bg-white -mt-8 rounded-t-3xl pt-8 px-4 pb-20">
          {/* 标题 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{displayData.name}</h1>

          {/* AI 生成的标签 */}
          <div className="flex space-x-2 overflow-x-auto pb-3 mb-4">
            {displayData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex-shrink-0 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 价格和库存 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">${displayData.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">库存: {displayData.stock}</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                {displayData.stockStatus}
              </span>
            </div>
          </div>

          {/* 描述 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-medium text-gray-900">描述</h2>
              <button
                className="text-green-600 flex items-center"
                onClick={toggleDescription}
              >
                {expanded ? (
                  <>
                    <span className="text-sm mr-1">收起</span>
                    <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    <span className="text-sm mr-1">展开</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
            <div className={`text-sm text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>
              {displayData.description}
            </div>
          </div>
        </div>
      </div>

      {/* 底部核心操作区 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <button
          className="w-full bg-green-500 text-white font-medium py-4 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
          onClick={handleGenerateAiReport}
        >
          <span>生成 AI 分析报告 (Step 3)</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </button>
      </div>

      {/* 底部抽屉 (AI 分析报告) */}
      {showAiDrawer && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowAiDrawer(false)}
          />

          {/* 抽屉内容 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">AI 分析报告</h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAiDrawer(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* 市场脉搏 */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">市场脉搏</h4>
                <div className="flex flex-col items-center">
                  {/* 环形进度条 */}
                  <div className="relative w-32 h-32 mb-3">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* 背景圆环 */}
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="12"
                      />
                      {/* 进度圆环 */}
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${(productData.aiAnalysis.marketScore / 100) * 351.86} 351.86`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{productData.aiAnalysis.marketScore}</span>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">机会评分</span>
                </div>
              </div>

              {/* 合规检查 */}
              <div className="mb-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">合规检查</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">版权安全</span>
                      <p className="text-sm text-gray-600">未检测到侵权</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle size={20} className="text-yellow-500 mr-3 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-gray-900">政策提示</span>
                      <p className="text-sm text-gray-600">建议优化描述</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 下一步按钮 */}
              <button
                className="w-full bg-green-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
                onClick={handleNextStep}
              >
                <span>前往素材工坊 (Step 3)</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

// 缺少的图标组件
const ArrowRight = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const X = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default function ProductDetail() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading product...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}