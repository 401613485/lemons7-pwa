// Mock API functions for ad campaigns

// Mock database
let mockAdCampaigns = [
  {
    id: '1',
    platform: 'TikTok',
    status: 'active',
    budget: 120,
    spent: 85.50,
    roas: 3.2,
    clicks: 250,
    conversions: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    platform: 'TikTok',
    status: 'paused',
    budget: 250,
    spent: 120.00,
    roas: 2.8,
    clicks: 180,
    conversions: 8,
    createdAt: new Date().toISOString(),
  },
];

// Types
export interface AdCampaign {
  id: string;
  platform: string;
  status: 'active' | 'paused';
  budget: number;
  spent: number;
  roas: number;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export interface CreateCampaignData {
  platform: string;
  budget: number;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  卖点: string;
}

// Create a new campaign
export const createCampaign = async (data: CreateCampaignData): Promise<AdCampaign> => {
  // In a real app, this would be an API call to Supabase
  // For now, we'll mock the response
  const newCampaign: AdCampaign = {
    id: Math.random().toString(36).substr(2, 9),
    platform: data.platform,
    status: 'active',
    budget: data.budget,
    spent: 0,
    roas: 0,
    clicks: 0,
    conversions: 0,
    createdAt: new Date().toISOString(),
  };

  // Add to mock database
  mockAdCampaigns = [newCampaign, ...mockAdCampaigns];

  return newCampaign;
};

// Fetch all campaigns
export const fetchCampaigns = async (): Promise<AdCampaign[]> => {
  // In a real app, this would be an API call to Supabase
  // For now, we'll return the mock data
  return mockAdCampaigns as AdCampaign[];
};

// Update campaign status
export const updateCampaignStatus = async (id: string, status: 'active' | 'paused'): Promise<AdCampaign> => {
  // In a real app, this would be an API call to Supabase
  // For now, we'll update the mock data
  const campaignIndex = mockAdCampaigns.findIndex(campaign => campaign.id === id);
  if (campaignIndex === -1) {
    throw new Error('Campaign not found');
  }

  mockAdCampaigns[campaignIndex] = {
    ...mockAdCampaigns[campaignIndex],
    status,
  };

  return mockAdCampaigns[campaignIndex] as AdCampaign;
};
