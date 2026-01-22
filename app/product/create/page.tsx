'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Camera,
  X,
  ArrowRight,
  RefreshCw,
  ChevronLeft,
} from 'lucide-react';

interface ImageFile {
  id: string;
  url: string;
  file: File;
}

const CreateProductPage = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    sku: '',
    price: '',
    stock: '',
    leadTime: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file,
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setImages([]);
    setFormData({
      description: '',
      sku: '',
      price: '',
      stock: '',
      leadTime: '',
    });
  };

  const handleGenerateProductPage = async () => {
    setIsGenerating(true);
    
    try {
      const rawInput = formData.description;
      const price = formData.price;
      const inventory = formData.stock;
      const sku = formData.sku;
      
      // 调用 AI 生成 API
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: rawInput,
          type: 'product_copy'
        })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      // 跳转到产品详情页预览结果
      router.push(`/product/detail?price=${price}&inventory=${inventory}&sku=${sku}&title=${encodeURIComponent(data.title)}&desc=${encodeURIComponent(data.description)}`);
    } catch (error) {
      console.error('Error generating product:', error);
      alert('生成失败，请稍后重试');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部导航 */}
      <header className="bg-white px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <button 
          className="text-gray-600 hover:text-gray-900"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">创建商品 (Step 2/7)</h1>
        <button 
          className="text-gray-600 hover:text-gray-900 text-sm"
          onClick={handleReset}
        >
          重置
        </button>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 媒体素材区 */}
        <div className="space-y-3">
          <h2 className="text-base font-medium text-gray-900">媒体素材</h2>
          <p className="text-xs text-gray-500 mt-1">请提供产品多角度图片 3-9 张</p>
          <div className="relative">
            <div className="flex space-x-3 overflow-x-auto pb-3 snap-x">
              {/* 上传主图按钮 */}
              <button
                className="snap-start flex-shrink-0 w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-green-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={24} className="text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">上传主图</span>
              </button>

              {/* 已上传图片 */}
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="snap-start flex-shrink-0 w-28 h-28 relative"
                >
                  <img
                    src={image.url}
                    alt={`Product image ${image.id}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    onClick={() => handleRemoveImage(image.id)}
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </motion.div>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* 基础信息表单 */}
        <div className="bg-white rounded-xl p-4 space-y-4">
          <h2 className="text-base font-medium text-gray-900">基础信息</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">产品灵感 / 简短描述</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors min-h-[100px]"
                placeholder="例如：这是一款适合户外使用的防水蓝牙音箱..."
              />
            </div>

            {/* SKU & 售价 (Row 1) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="SKU"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">售价 (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      const value = parseFloat((e.target as HTMLInputElement).value);
                      if (!isNaN(value)) {
                        setFormData({
                          ...formData,
                          price: value.toFixed(2),
                        });
                      }
                    }}
                    className="w-full px-3 py-2 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {/* 库存 & 交期 (Row 2) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">库存</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="0"
                  step="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">交期</label>
                <div className="relative">
                  <input
                    type="number"
                    name="leadTime"
                    value={formData.leadTime}
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      const value = (e.target as HTMLInputElement).value;
                      if (value === '') {
                        setFormData({
                          ...formData,
                          leadTime: '',
                        });
                      } else {
                        const roundedValue = Math.round(parseFloat(value));
                        setFormData({
                          ...formData,
                          leadTime: roundedValue.toString(),
                        });
                      }
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    step="1"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">天</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部悬浮栏 */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="w-full bg-green-500 text-white font-medium py-4 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleGenerateProductPage}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={18} className="animate-spin" />
              <span>AI 正在思考 (Calling Gemini)...</span>
            </>
          ) : (
            <>
              <span>✨ 生成产品落地页 (Step 3)</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default CreateProductPage;