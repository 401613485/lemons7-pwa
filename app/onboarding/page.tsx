'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Upload, ChevronRight, HelpCircle, Building, Phone, Mail, MapPin, CheckCircle, CreditCard, Globe, User, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';

const Onboarding = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    // Enterprise
    businessLicense: null as File | null,
    companyName: '',
    unifiedCreditCode: '',
    legalRepresentative: '',
    registeredAddress: '',
    // Contact
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    officeAddress: '',
    // Payment
    bankCountry: '',
    beneficiaryName: '',
    bankName: '',
    bankCode: '',
    swiftCode: '',
    bankAccount: ''
  });

  const paymentMethods = [
    { id: 'worldfirst', name: '万里汇', logo: 'WF' },
    { id: 'airwallex', name: '空中云汇', logo: 'AW' },
    { id: 'lianlian', name: '连连支付', logo: 'LL' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, businessLicense: file }));
      setIsUploading(true);
      
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          companyName: '深圳市柠檬科技有限公司',
          unifiedCreditCode: '91440300MA5G8X9Y3L',
          legalRepresentative: '张三',
          registeredAddress: '深圳市南山区科技园南区T3栋801'
        }));
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setPaymentMethod(methodId);
  };

  const handleCompleteStep1 = () => {
    // 模拟保存数据
    setTimeout(() => {
      router.push('/dashboard');
      // 这里可以添加 Toast 提示，但需要额外的 Toast 组件
    }, 500);
  };

  const Section = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => router.push('/login')}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 tracking-widest uppercase">
              七步出海路线图
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step 1/7: 基础建设
            </span>
          </div>
          <div className="size-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            基础建设
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            建立企业基础档案，为出海业务做好准备
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Section delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                1
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                企业资质认证
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  营业执照
                </h3>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-semibold">
                  Required
                </span>
              </div>
              <div className="relative group">
                <label 
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-all cursor-pointer ${
                    formData.businessLicense 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 hover:bg-white dark:hover:bg-gray-800 hover:shadow-sm'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3">
                      <motion.div className="animate-spin">
                        <RefreshCw className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        AI 识别中...
                      </p>
                    </div>
                  ) : formData.businessLicense ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        营业执照已上传
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.businessLicense.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 space-y-3">
                      <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        点击上传营业执照
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF, JPG, PNG (max 10MB)
                      </p>
                    </div>
                  )}
                  <input 
                    className="hidden" 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    企业名称
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                    placeholder="请输入企业名称"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    统一社会信用代码
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                    placeholder="请输入统一社会信用代码"
                    type="text"
                    value={formData.unifiedCreditCode}
                    onChange={(e) => handleInputChange('unifiedCreditCode', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    法定代表人
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                    placeholder="请输入法定代表人"
                    type="text"
                    value={formData.legalRepresentative}
                    onChange={(e) => handleInputChange('legalRepresentative', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    注册地址
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                    placeholder="请输入注册地址"
                    type="text"
                    value={formData.registeredAddress}
                    onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                2
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                运营负责人
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  负责人姓名
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                  placeholder="请输入负责人姓名"
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  联系电话
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                  placeholder="请输入联系电话"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  电子邮箱
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                  placeholder="请输入电子邮箱"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  办公地址
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                  placeholder="请输入办公地址"
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => handleInputChange('officeAddress', e.target.value)}
                />
              </div>
            </div>
          </Section>

          <Section delay={0.3}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                3
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                绑定收款账户
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  选择收款渠道
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'worldfirst', name: '万里汇', icon: 'WF' },
                    { id: 'airwallex', name: '空中云汇', icon: 'AW' },
                    { id: 'lianlian', name: '连连支付', icon: 'LL' }
                  ].map((channel) => (
                    <button
                      key={channel.id}
                      className={`relative p-3 rounded-lg border-2 transition-all cursor-pointer ${paymentMethod === channel.id 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-green-300 dark:hover:border-green-700'
                      }`}
                      onClick={() => handlePaymentMethodChange(channel.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {channel.name}
                        </h4>
                        {paymentMethod === channel.id && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        支持多币种收款
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {paymentMethod && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    银行信息
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        银行所在国家/地区
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                        placeholder="请输入银行所在国家/地区"
                        type="text"
                        value={formData.bankCountry}
                        onChange={(e) => handleInputChange('bankCountry', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        收款人户名
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                        placeholder="请输入收款人户名"
                        type="text"
                        value={formData.beneficiaryName}
                        onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        银行名称
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                        placeholder="请输入银行名称"
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                          Bank Code
                        </label>
                        <input
                          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                          placeholder="Bank Code"
                          type="text"
                          value={formData.bankCode}
                          onChange={(e) => handleInputChange('bankCode', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                          SWIFT/BIC
                        </label>
                        <input
                          className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                          placeholder="SWIFT/BIC"
                          type="text"
                          value={formData.swiftCode}
                          onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        银行账号
                      </label>
                      <input
                        className="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm transition-all outline-none"
                        placeholder="请输入银行账号"
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </Section>
        </motion.div>
      </main>

      <div className="p-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleCompleteStep1}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md shadow-green-500/20 transition-all duration-200 active:scale-[0.98]"
        >
          完成 Step 1，进入平台对接 (Step 2/7)
          <ChevronRight className="w-4 h-4" />
        </button>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          完成基础建设后，您将进入下一阶段
        </p>
      </div>
    </div>
  );
};

export default Onboarding;